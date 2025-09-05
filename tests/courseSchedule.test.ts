import { courseSchedule } from '../src/courseSchedule';
import { describe, it, expect } from 'vitest';

describe('courseSchedule', () => {
  it('should return true when courses can be finished (Example 1)', () => {
    const numCourses = 2;
    const prerequisites = [[1, 0]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return false when there is a cycle (Example 2)', () => {
    const numCourses = 2;
    const prerequisites = [[1, 0], [0, 1]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(false);
  });

  it('should return true when there are no prerequisites', () => {
    const numCourses = 3;
    const prerequisites: number[][] = [];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return true for a linear course chain', () => {
    const numCourses = 4;
    const prerequisites = [[1, 0], [2, 1], [3, 2]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return false for a more complex cycle', () => {
    const numCourses = 3;
    const prerequisites = [[0, 1], [1, 2], [2, 0]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(false);
  });

  it('should return true with multiple independent paths', () => {
    const numCourses = 4;
    const prerequisites = [[1, 0], [2, 0], [3, 1]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should handle courses not present in prerequisites but within numCourses', () => {
    const numCourses = 5;
    const prerequisites = [[1, 0], [2, 1], [3, 2], [4, 1]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return true for a diamond dependency graph', () => {
    const numCourses = 4;
    const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return false when a cycle exists with additional dependencies', () => {
    const numCourses = 4;
    const prerequisites = [[1, 0], [2, 1], [0, 2], [3, 1]];
    expect(courseSchedule(numCourses, prerequisites)).toBe(false);
  });

  it('should return true for a single course', () => {
    const numCourses = 1;
    const prerequisites: number[][] = [];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });

  it('should return true for two independent courses', () => {
    const numCourses = 2;
    const prerequisites: number[][] = [];
    expect(courseSchedule(numCourses, prerequisites)).toBe(true);
  });
});
