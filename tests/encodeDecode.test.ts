import { Codec } from '../src/encodeDecode';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Codec', () => {
  let codec: Codec;

  beforeEach(() => {
    codec = new Codec();
  });

  describe('encode method', () => {
    it('should encode empty array correctly', () => {
      const result = codec.encode([]);
      expect(result).toBe('');
    });

    it('should encode array with single string', () => {
      const result = codec.encode(['hello']);
      expect(result).toBe('5#hello');
    });

    it('should encode array with multiple strings', () => {
      const result = codec.encode(['hello', 'world']);
      expect(result).toBe('5#hello5#world');
    });
  });

  describe('decode method', () => {
    it('should decode empty string to empty array', () => {
      const result = codec.decode('');
      expect(result).toEqual([]);
    });

    it('should decode single encoded string', () => {
      const result = codec.decode('5#hello');
      expect(result).toEqual(['hello']);
    });

    it('should decode multiple encoded strings', () => {
      const result = codec.decode('5#hello5#world');
      expect(result).toEqual(['hello', 'world']);
    });
  });

  describe('roundtrip encoding/decoding', () => {
    it('should handle empty array roundtrip', () => {
      const original: string[] = [];
      const encoded = codec.encode(original);
      const decoded = codec.decode(encoded);
      expect(decoded).toEqual(original);
    });

    it('should handle single string roundtrip', () => {
      const original = ['hello'];
      const encoded = codec.encode(original);
      const decoded = codec.decode(encoded);
      expect(decoded).toEqual(original);
    });
    it('should handle string with delimiter', () => {
      const original = ['hello#world'];
      const encoded = codec.encode(original);
      const decoded = codec.decode(encoded);

      expect(decoded).toEqual(original);
      expect(decoded).toEqual(['hello#world']);
    });
  });

});