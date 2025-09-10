import { rotateImage } from '../src/rotateImage';
import { describe, it, expect } from 'vitest';

describe('rotateImage', () => {
  it('should pass', () => {
    expect(rotateImage()).toBeUndefined();
  });
});
