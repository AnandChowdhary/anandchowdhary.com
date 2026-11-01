import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blogTopics, blogPostPath, topicsForPost, publishedTopics, relatedReading } from '../src/lib/blog-topics';
import type { BlogPost } from '../src/views/api';
const post = (id: string, draft = false): BlogPost => {
  const [year, slug] = id.split('/');
  return { slug: slug + '.md', date: year + '-01-01', title: slug, excerpt: '', emoji: '', source: '', path: '', attributes: { date: year + '-01-01', draft } };
};

test('curated topics have stable unique slugs, article IDs and nonempty reading lists', () => {
  assert.equal(new Set(blogTopics.map(topic => topic.slug)).size, blogTopics.length);
  for (const topic of blogTopics) {
    assert.match(topic.slug, /^[a-z-]+$/);
    assert.ok(topic.title && topic.description && topic.articles.length >= 3);
    assert.equal(new Set(topic.articles).size, topic.articles.length);
    topic.articles.forEach(id => assert.match(id, /^\d{4}\/[a-z0-9-]+$/));
  }
});

test('topic pages retain curated order and omit unpublished/withdrawn articles and empty topics', () => {
  const items = [post('2026/agentscript'), post('2026/future-ai-native-work'), post('2025/running-claude-code-in-a-loop', true)];
  const topics = publishedTopics(items);
  const ai = topics.find(topic => topic.slug === 'ai')!;
  assert.deepEqual(ai.posts.map(blogPostPath), ['/blog/2026/future-ai-native-work','/blog/2026/agentscript']);
  assert.equal(topics.some(topic => topic.slug === 'culture'), false);
  assert.equal(publishedTopics([]).length, 0);
  assert.deepEqual(topicsForPost(post('2027/unreviewed-article')), []);
});

test('related reading follows shared topics and editorial order, with no self, draft, duplicate or unrelated links', () => {
  const current = post('2026/future-ai-native-work');
  const items = [current, post('2026/agentscript'), post('2025/running-claude-code-in-a-loop'), post('2020/automated-journalism-authorship'), post('2016/machine-learning-in-6-lines', true), post('2017/college')];
  items.push(items[1]); // Duplicate upstream entries must not repeat recommendations.
  assert.deepEqual(relatedReading(current, items).map(blogPostPath), ['/blog/2025/running-claude-code-in-a-loop','/blog/2026/agentscript','/blog/2020/automated-journalism-authorship']);
  assert.equal(relatedReading(current, [current]).length, 0);
  assert.equal(relatedReading(current, items, 1).length, 1);
  assert.equal(relatedReading(post('2027/unreviewed-article'), items).length, 0);
});
