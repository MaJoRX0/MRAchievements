import { Category } from '../types';

import pako from 'pako';




// _________________________________________________________________________________

export function compressAndEncodeForUrl(jsonData: object): string {
    // Convert JSON to string
    const jsonString = JSON.stringify(jsonData);
    
    // Convert string to Uint8Array
    const uint8Array = new TextEncoder().encode(jsonString);
    
    // Compress using DEFLATE
    const compressed = pako.deflate(uint8Array);
    
    // Convert compressed data to binary string
    const binaryString = Array.from(compressed)
      .map(byte => String.fromCharCode(byte))
      .join('');
    
    // Base64 encode using built-in btoa
    const base64String = btoa(binaryString);
    
    // Make URL-safe (replace '+' with '-', '/' with '_', remove '=')
    return base64String
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }


  export function decodeAndDecompress(encodedData: string): string {
    try {
      // Restore Base64 padding if needed
      const base64String = encodedData
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      
      // Pad with '=' if needed
      const paddedBase64 = base64String.padEnd(
        base64String.length + (4 - (base64String.length % 4 || 4)) % 4,
        '='
      );
      
      // Base64 decode using built-in atob
      const binaryString = atob(paddedBase64);
      
      // Convert binary string to Uint8Array
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      
      // Decompress
      const decompressedData = pako.inflate(uint8Array);
      
      // Convert Uint8Array to string
      const jsonString = new TextDecoder().decode(decompressedData);
      
      // Parse JSON
      return jsonString;
    } catch (error) {
      console.error('Failed to decode and decompress data:', error);
      throw new Error('Invalid encoded data');
    }
  }

// _____________________________________________________

  function groupAndCompressIds(ids: string[]): string[] {
    const groups: Record<string, number[]> = {};
  
    // Step 1: Group IDs by prefix
    ids.forEach(id => {
      const match = id.match(/^([a-zA-Z]+)(\d+)$/); // Extract prefix and number
      if (!match) return;
  
      const [, prefix, number] = match;
      if (!groups[prefix]) groups[prefix] = [];
  
      groups[prefix].push(Number(number)); // Store numbers as integers
    });
  
    // Function to compress sequential numbers into ranges
    const compressRanges = (prefix: string, numbers: number[]): string[] => {
      numbers.sort((a, b) => a - b); // Sort numbers
      const ranges: string[] = [];
  
      let start = numbers[0];
      let prev = numbers[0];
  
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === prev + 1) {
          prev = numbers[i]; // Continue sequence
        } else {
          // End previous sequence
          ranges.push(start === prev ? `${prefix}${start}` : `${prefix}${start}-${prev}`);
          start = numbers[i];
          prev = numbers[i];
        }
      }
  
      // Add the last sequence
      ranges.push(start === prev ? `${prefix}${start}` : `${prefix}${start}-${prev}`);
      return ranges;
    };
  
    // Apply compression to each group and flatten the result
    return Object.keys(groups).flatMap(prefix => compressRanges(prefix, groups[prefix]));
  }


  function decompressIds(compressedIds: string[]): string[] {
    const result: string[] = [];
  
    compressedIds.forEach(entry => {
      const match = entry.match(/^([a-zA-Z]+)(\d+)(?:-(\d+))?$/);
      if (!match) return;
  
      const [, prefix, start, end] = match;
      const startNum = Number(start);
      const endNum = end ? Number(end) : startNum;
  
      for (let i = startNum; i <= endNum; i++) {
        result.push(`${prefix}${i}`);
      }
    });
  
    return result;
  }
// _____________________________________________________________________________________________

// Convert completion state to a compressed string
export function encodeProgress(categories: Category[]): string {
  // Create a simple array of completed achievement IDs
  const completedIds = groupAndCompressIds(categories.flatMap(category =>
    category.achievements
      .filter(ach => ach.completed)
      .map(ach => ach.id)
  ));

  console.log("Cloud1", compressAndEncodeForUrl(completedIds).length)
  console.log("Cloud Dec", (decodeAndDecompress(compressAndEncodeForUrl(completedIds))))



  return compressAndEncodeForUrl(completedIds);
}

// Parse the compressed string back to completion state
export function decodeProgress(encoded: string): string[] {
  try {
    console.log("decodP",decodeAndDecompress(encoded))
    return decompressIds(JSON.parse(decodeAndDecompress(encoded)));
  } catch (error) {
    console.error('Error decoding progress:', error);
    return [];
  }
}



// Generate a shareable URL with the current progress
export function generateShareableUrl(categories: Category[]): string {
  const encoded = encodeProgress(categories);
  const url = new URL(window.location.href);
  url.searchParams.set('p', encoded); // Shorter parameter name
  // Remove any other parameters
  for (const key of Array.from(url.searchParams.keys())) {
    if (key !== 'p') {
      url.searchParams.delete(key);
    }
  }
  console.log(url.toString())
  return url.toString();
}

// Check if the URL contains shared progress
export function hasSharedProgress(): boolean {
  const url = new URL(window.location.href);
  return url.searchParams.has('p');
}

// Get shared progress from URL
export function getSharedProgress(): string[] | null {
  const url = new URL(window.location.href);
  const progress = url.searchParams.get('p');
  if (!progress) return null;
  return decompressIds(decodeProgress(progress));
}