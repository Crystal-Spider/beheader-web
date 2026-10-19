# Device checks

## Prepare

Open https://crystal-spider.github.io/beheader-web/ in a normal browsing session. Record which build is being tested; the visible version stays 1.0.0, so it does not distinguish fixes. A source commit or build asset name is useful. Refresh online first and allow a new build to cache; a subsequent page load uses it when caching has completed.

For a local Mac check, run `pnpm build` and `pnpm preview`, then open http://127.0.0.1:4173/beheader-web/ in Safari. Android can use Chrome USB port forwarding from device `localhost:4173` to the desktop preview. An iPhone needs an HTTPS host it trusts; an ordinary HTTP LAN URL does not provide the secure context needed for storage and offline features.

Use small, nonprivate files or the original fixtures in `e2e/fixture`. Transfer fixtures to the device before testing; the app does not download them automatically. Keep ordinary and private-browsing results separate because their storage lifetimes differ.

## Main workflow

1. Select **Try an example**, then **Combine files**. Download the `.html`, `.m4a`, `.ico`, `.pdf` and `.zip` variants. Confirm that the device can save them, then open each in a compatible viewer. Record the viewer and version, including any restriction on opening local HTML or polyglots.
2. Reorder the two archives and combine again. The shared `hello.txt` greeting should change, while `a.txt` and `b.txt` remain. In Italian the shared file is `ciao.txt`. A single archive should have no drag handle; several should appear as nested entries inside one shared card. Test both individual removal and **Remove all archives**.
3. Switch languages and load the example again. Filenames and contents should follow the selected language. Reload: language preference should remain, while selected files and results disappear. Open and close the title-card guide; its first-use highlight should stop after opening it.
4. Test portrait, landscape, larger system text and long filenames. At 320 CSS pixels or wider, the page should not scroll horizontally. Check select panels, role controls, icon actions, disabled-badge explanations and wrapped footer alignment. On Mac, also use Tab/Shift+Tab, Enter and Escape.
5. Select an image and audio file. Both Audio and Video badges should become unavailable with an explanation that they share a slot. Removing the audio should enable both again. Replace a file and check that its picker filters match the explicitly assigned role; auto detection uses the broader picker.
6. Drag archive handles on a phone: dragging should start without a long hold, show no handle tooltip and avoid scrolling the page. Scrolling outside a handle should still work. On Mac, check keyboard ordering with the handle's Up/Down keys and stable ordering after dropping.
7. Attach an HTML asset ZIP, then replace the HTML. The old asset ZIP should disappear. Replacing a different file should leave it attached. Verify that the bundled example HTML opens with its CSS and image while offline.

## Messages, progress and recovery

- Add overlapping archives. An early yellow warning should identify which archive wins and update after reordering/removal.
- Try an invalid or unsupported PDF, a duplicate non-archive role and an animated image. Expect a red error with a useful reason; removing or replacing the bad input should allow a retry. A valid but unsupported PDF layout should not be described simply as corrupt.
- With fewer than two families, Combine should be disabled and explain the minimum through its tooltip, without adding a message to the section.
- Information should be light blue, warnings yellow and errors red. Only errors should offer Diagnostics and Report. The two actions should stack full-width on narrow screens, with Diagnostics first.
- Change files while messages are present. Keep the previous messages visible until the new check finishes. Replace them directly when new messages arrive; close the section only if the new list is empty. Check that it does not briefly close and reopen, and that reporting/consent actions are disabled while checking.
- A longer audio file should show changing compatibility labels/activity. Overall progress should not move backward. Very fast work should avoid flashing a progress panel; a shown successful panel should remain briefly without delaying finished controls.
- Start a longer combination. Combine should become Cancel in the same button, with cancellation available before progress appears. Cancel, then retry with the example. The app should become usable again without stale errors or files returning after reload.
- For missing HTML assets, check the reference list and explicit choice to continue unchanged. Review downloaded diagnostics before sharing them: filenames, paths and contents should not be included. Reporting should open a draft issue, not submit it automatically.

## Offline use

Open the production app online and allow its initial cache to finish. Close it, disable the network, and reopen the exact URL in the same browser. The shell, language switch, example files, MP3 conversion and downloads should still work. There is no offline-ready banner or manual update button. Restore the network afterward.

If reopening fails, record whether site data was cleared, private browsing was used, storage was denied or the device was low on space. A storage failure should produce a useful message and leave correction/retry possible.

## Format checks

For audio tests, pair each fixture with a small self-contained HTML file. If using `public/assets/example/en/page.html` or its Italian equivalent, also attach its matching example asset ZIP; otherwise its local CSS/image references will be unresolved.

| Selection | Expected check |
| --- | --- |
| HTML + `audio.mp3` | Playable AAC-LC output; retest on iPhone with native MP3 decoding unavailable |
| HTML + `audio.wav` | Playable audio with expected duration |
| HTML + `audio-vorbis.ogg` / `audio-opus.ogg` | Playable audio, or a recorded native-decoder limitation for that browser |
| HTML + compatible `audio.m4a` | Playable AAC without requiring a decode/conversion path |
| `transparent.png` + `video-aac.mp4` | Retained image transparency and video with its existing soundtrack |
| `classic.pdf` + `first.zip` + `second.zip` | Readable PDF page; ZIP extraction takes `shared.txt` from the later archive. Reverse order and confirm the winner changes |
| HTML + matching asset ZIP + image | Inlined CSS/images work offline; missing references require correction or explicit consent |
| HTML + `animated.gif`, `encrypted.pdf` or `corrupt.zip` | Actionable rejection followed by successful correction and retry |

Save output before opening it in an external viewer. Record generation, download and viewer behavior separately: the OS may choose the wrong default app or a viewer may reject mixed formats. Larger-file testing is optional; device capacity is not guaranteed by the application's size limits.

## Record a result

Copy one block per device. Use pass, fail or unverified for each relevant item, and include enough steps to reproduce a failure without sharing private contents.

```text
Build/source commit or asset name:
Device model:
OS and version:
Browser and version:
Inputs: fixture names, or formats and sizes
Example generation and downloads:
Language, reload and cleared files:
Layout, controls and touch/keyboard ordering:
Messages and error correction:
Progress, cancellation and retry:
Offline reopen, conversion and download:
MP3 / WAV / Vorbis / Opus / AAC:
Video / image / PDF / archive / bundled HTML:
Output extension and external viewer/version:
Expected result:
Actual result and diagnostic code:
Reproduction steps:
Screenshot or reviewed diagnostics, if useful:
```

Add confirmed device/viewer results to [COMPATIBILITY.md](COMPATIBILITY.md). Leave untested items marked unverified.
