import {test} from 'node:test';
import assert from 'node:assert/strict';
import {latestRecordedDate} from '../src/views/components/data-freshness';
test('latest record uses valid data dates rather than refresh time or array order',()=>{
 assert.equal(latestRecordedDate(['2020-03-01','invalid','2026-01-02','2024-02-01']),'2026-01-02');
 assert.equal(latestRecordedDate([]),undefined);
});
