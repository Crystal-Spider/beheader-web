import {AudioCodec, AudioSample, CustomAudioDecoder, EncodedPacket, registerDecoder} from 'mediabunny';
import {MPEGDecoder} from 'mpg123-decoder';

import {invalid} from '../io/binary';

/** Worker-local fallback; registered only after the native MP3 capability probe fails. */
class Mp3Decoder extends CustomAudioDecoder {
  /** @type {MPEGDecoder | undefined} */
  private decoder?: MPEGDecoder;
  /** @type {number | undefined} */
  private start?: number;
  /** @type {number} */
  private frames = 0;

  /**
   * @param {AudioCodec} codec Requested codec.
   * @returns {boolean} Only MP3 uses this fallback.
   */
  public static override supports(codec: AudioCodec): boolean { return codec === 'mp3'; }

  /**
   * @returns {Promise<void>} Initialized bounded WASM decoder.
   */
  public override async init(): Promise<void> {
    // Mediabunny strips Xing/LAME metadata before supplying packets. Match its packet
    // timeline rather than applying a second, incomplete gapless trimming policy.
    this.decoder = new MPEGDecoder({enableGapless: false});
    await this.decoder.ready;
  }

  /**
   * @param {EncodedPacket} packet One demuxed MPEG frame.
   */
  public override decode(packet: EncodedPacket): void {
    if (!this.decoder) { invalid('AUDIO_CONVERSION_FAILED'); }
    this.start ??= packet.timestamp;
    const decoded = this.decoder.decodeFrame(packet.data);
    if (decoded.errors.length) { invalid('AUDIO_INVALID'); }
    if (!decoded.samplesDecoded) { return; }
    const channels = this.config.numberOfChannels;
    if (![1, 2].includes(channels) || decoded.sampleRate !== this.config.sampleRate) { invalid('AUDIO_CODEC'); }
    const data = new Float32Array(decoded.samplesDecoded * channels);
    for (let channel = 0; channel < channels; channel++) {
      const plane = decoded.channelData[channel];
      if (plane?.length !== decoded.samplesDecoded) { invalid('AUDIO_INVALID'); }
      data.set(plane, channel * decoded.samplesDecoded);
    }
    const sample = new AudioSample({data, format: 'f32-planar', numberOfChannels: channels, sampleRate: decoded.sampleRate, timestamp: this.start + this.frames / decoded.sampleRate});
    this.frames += decoded.samplesDecoded;
    this.onSample(sample);
  }

  /** Complete MPEG frames are drained synchronously by decodeFrame. */
  public override flush(): void {}

  /** Releases this decoder's WASM allocation on completion or cancellation. */
  public override close(): void {
    this.decoder?.free();
    this.decoder = undefined;
  }
}

/** Registers once per owning worker; native-capable workers never import this module. */
export function registerMp3Decoder(): void { registerDecoder(Mp3Decoder); }
