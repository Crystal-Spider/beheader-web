import {WorkerRuntime} from '~bhw/polyglot/worker/runtime';

const runtime = new WorkerRuntime(response => { postMessage(response); });
addEventListener('message', (event: MessageEvent<unknown>) => { void runtime.receive(event.data); });
