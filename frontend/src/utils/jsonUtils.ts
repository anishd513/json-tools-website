import type { JsonError, ValidationResult, ConversionResult, ComparisonResult, Difference } from '../types';

export class JsonUtils {
  /**
   * Validate JSON string and return detailed results
   */
  static validateJson(jsonString: string): ValidationResult {
    const errors: JsonError[] = [];
    let isValid = false;
    let formatted: string | undefined;
    let minified: string | undefined;

    if (!jsonString.trim()) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Empty JSON input',
        severity: 'error'
      });
      return { isValid: false, errors };
    }

    try {
      const parsed = JSON.parse(jsonString);
      isValid = true;
      formatted = JSON.stringify(parsed, null, 2);
      minified = JSON.stringify(parsed);
    } catch (error: any) {
      const match = error.message.match(/at position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      const { line, column } = this.getLineColumn(jsonString, position);
      
      errors.push({
        line,
        column,
        message: error.message,
        severity: 'error'
      });
    }

    return { isValid, errors, formatted, minified };
  }

  /**
   * Format JSON with custom indentation
   */
  static formatJson(jsonString: string, indent: number = 2): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, indent);
      return { success: true, result: formatted };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Minify JSON by removing whitespace
   */
  static minifyJson(jsonString: string): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      return { success: true, result: minified };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Convert JSON to XML
   */
  static jsonToXml(jsonString: string): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString);
      const xml = this.objectToXml(parsed, 'root');
      return { success: true, result: `<?xml version="1.0" encoding="UTF-8"?>\n${xml}` };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Convert XML to JSON
   */
  static xmlToJson(xmlString: string): ConversionResult {
    try {
      // Simple XML to JSON conversion (basic implementation)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML format');
      }
      
      const json = this.xmlNodeToObject(xmlDoc.documentElement);
      return { success: true, result: JSON.stringify(json, null, 2) };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Convert JSON to CSV (for arrays of objects)
   */
  static jsonToCsv(jsonString: string): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString);
      
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array for CSV conversion');
      }
      
      if (parsed.length === 0) {
        return { success: true, result: '' };
      }
      
      // Get all unique keys from all objects
      const allKeys = new Set<string>();
      parsed.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(key => allKeys.add(key));
        }
      });
      
      const headers = Array.from(allKeys);
      const csvRows = [headers.join(',')];
      
      parsed.forEach(item => {
        const row = headers.map(header => {
          const value = item && typeof item === 'object' ? (item as any)[header] : '';
          return this.escapeCsvValue(String(value || ''));
        });
        csvRows.push(row.join(','));
      });
      
      return { success: true, result: csvRows.join('\n') };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Convert CSV to JSON
   */
  static csvToJson(csvString: string): ConversionResult {
    try {
      const lines = csvString.trim().split('\n');
      if (lines.length < 2) {
        throw new Error('CSV must have at least a header row and one data row');
      }
      
      const headers = this.parseCsvRow(lines[0]);
      const result = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCsvRow(lines[i]);
        const obj: any = {};
        
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        
        result.push(obj);
      }
      
      return { success: true, result: JSON.stringify(result, null, 2) };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Compare two JSON objects
   */
  static compareJson(json1: string, json2: string): ComparisonResult {
    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      
      const differences = this.findDifferences(obj1, obj2, '');
      const areEqual = differences.length === 0;
      
      return { areEqual, differences };
    } catch (error) {
      return { areEqual: false, differences: [] };
    }
  }

  /**
   * Escape JSON string
   */
  static escapeJson(str: string): string {
    return JSON.stringify(str);
  }

  /**
   * Unescape JSON string
   */
  static unescapeJson(str: string): ConversionResult {
    try {
      const result = JSON.parse(str);
      return { success: true, result: String(result) };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Sort JSON object keys alphabetically
   */
  static sortJsonKeys(jsonString: string): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString);
      const sorted = this.sortObjectKeys(parsed);
      return { success: true, result: JSON.stringify(sorted, null, 2) };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Private helper methods

  private static getLineColumn(text: string, position: number): { line: number; column: number } {
    const lines = text.substring(0, position).split('\n');
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1
    };
  }

  private static objectToXml(obj: any, rootName: string): string {
    if (obj === null || obj === undefined) {
      return `<${rootName}></${rootName}>`;
    }
    
    if (typeof obj !== 'object') {
      return `<${rootName}>${this.escapeXml(String(obj))}</${rootName}>`;
    }
    
    if (Array.isArray(obj)) {
      return obj.map((item, index) => 
        this.objectToXml(item, `${rootName}_${index}`)
      ).join('\n');
    }
    
    const xmlParts = [`<${rootName}>`];
    Object.entries(obj).forEach(([key, value]) => {
      xmlParts.push(this.objectToXml(value, key));
    });
    xmlParts.push(`</${rootName}>`);
    
    return xmlParts.join('\n');
  }

  private static xmlNodeToObject(node: Element): any {
    const result: any = {};
    
    // Handle attributes
    if (node.attributes.length > 0) {
      result['@attributes'] = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        result['@attributes'][attr.name] = attr.value;
      }
    }
    
    // Handle child nodes
    if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent?.trim();
      return textContent || '';
    }
    
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childElement = child as Element;
        const childName = childElement.nodeName;
        const childValue = this.xmlNodeToObject(childElement);
        
        if (result[childName]) {
          if (!Array.isArray(result[childName])) {
            result[childName] = [result[childName]];
          }
          result[childName].push(childValue);
        } else {
          result[childName] = childValue;
        }
      }
    }
    
    return result;
  }

  private static escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private static escapeCsvValue(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private static parseCsvRow(row: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  private static findDifferences(obj1: any, obj2: any, path: string): Difference[] {
    const differences: Difference[] = [];
    
    if (obj1 === obj2) {
      return differences;
    }
    
    if (typeof obj1 !== typeof obj2) {
      differences.push({
        path,
        type: 'modified',
        oldValue: obj1,
        newValue: obj2
      });
      return differences;
    }
    
    if (obj1 === null || obj2 === null || typeof obj1 !== 'object') {
      differences.push({
        path,
        type: 'modified',
        oldValue: obj1,
        newValue: obj2
      });
      return differences;
    }
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);
    
    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key;
      
      if (!(key in obj1)) {
        differences.push({
          path: newPath,
          type: 'added',
          newValue: obj2[key]
        });
      } else if (!(key in obj2)) {
        differences.push({
          path: newPath,
          type: 'removed',
          oldValue: obj1[key]
        });
      } else {
        differences.push(...this.findDifferences(obj1[key], obj2[key], newPath));
      }
    });
    
    return differences;
  }

  private static sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObjectKeys(item));
    }
    
    const sorted: any = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = this.sortObjectKeys(obj[key]);
    });
    
    return sorted;
  }
}
