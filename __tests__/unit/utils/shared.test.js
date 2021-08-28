import { isObject, isError, isXMLHttpRequest } from '@/utils/shared';
import {
    verifyBoolean,
    verifyArray,
    verifyObject,
    verifyError,
    verifyXmlhttp
} from '../../__mocks__';

describe('utils/shared module', () => {
    test('shared/isObject', () => {
        expect(isObject(verifyBoolean)).toBe(false);
        expect(isObject(verifyArray)).toBe(false);
        expect(isObject(verifyObject)).toBe(true);
    });

    test('shared/isError', () => {
        expect(isError(verifyError)).toBe(true);
        expect(isError(verifyXmlhttp)).toBe(false);
    });

    test('shared/isXMLHttpRequest', () => {
        expect(isXMLHttpRequest(verifyError)).toBe(false);
        expect(isXMLHttpRequest(verifyArray)).toBe(false);
        expect(isXMLHttpRequest(verifyXmlhttp)).toBe(true);
    })
});