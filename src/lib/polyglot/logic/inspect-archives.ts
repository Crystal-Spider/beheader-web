import {InputSource, Inspection, ProcessingContext} from '../model/contract';
import {ArchiveBudget, ArchiveInfo, inspectArchive, mergeArchives} from '../format/archive';
import {checkCancelled, diagnose} from './diagnostic';
import {INPUT_LIMIT} from '../io/bytes';

/**
 * Reads bounded ZIP indexes for early overwrite warnings, without extracting payloads.
 * @param {Inspection} inspection Detected roles and immediate validation results.
 * @param {readonly InputSource[]} sources Current ordered selection.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {Promise<Inspection>} Selection feedback including archive collisions.
 */
export async function inspectSelectedArchives(inspection: Inspection, sources: readonly InputSource[], context: ProcessingContext): Promise<Inspection> {
  const diagnostics = [...inspection.diagnostics];
  const archives: ArchiveInfo[] = [];
  const budget = new ArchiveBudget();
  const selected = inspection.inputs.filter(input => input.role === 'archive' || input.role === 'html-assets');
  let completed = inspection.inputs.length;
  const total = completed + selected.length;
  context.progress({stage: 'inspect', completed, total, unit: 'inputs'});
  for (const input of selected) {
    checkCancelled(context.signal);
    const source = sources.find(source => source.id === input.id);
    if (!source) { continue; }
    try {
      context.progress({stage: 'inspect', completed, total, unit: 'inputs', detail: 'archive-index'});
      const archive = await inspectArchive(source, context, budget);
      if (input.role === 'archive') { archives.push(archive); }
      else {
        const html = inspection.inputs.find(input => input.role === 'html');
        const actual = (html?.size ?? 0) + archive.expandedSize;
        if (actual > INPUT_LIMIT) { diagnostics.push({code: 'FORMAT_RESOURCE_LIMIT', severity: 'error', inputId: input.id, details: {reason: 'HTML_LOGICAL_BYTES', actual, limit: INPUT_LIMIT}}); }
      }
    }
    catch(error) {
      checkCancelled(context.signal);
      diagnostics.push({...diagnose(error, 'ARCHIVE_INVALID'), inputId: input.id});
    }
    context.progress({stage: 'inspect', completed: ++completed, total, unit: 'inputs'});
  }
  try {
    const {collisions} = mergeArchives(archives);
    if (collisions.length) { diagnostics.push({code: 'ARCHIVE_COLLISION', severity: 'warning', details: {count: collisions.length}}); }
    return {...inspection, diagnostics, collisions};
  } catch(error) {
    checkCancelled(context.signal);
    return {...inspection, diagnostics: [...diagnostics, diagnose(error)]};
  }
}
