import createBufferPageWithAnnotation from './createBufferPageWithAnnotation';
import findObject from './findObject';
import SignPdfError from '../../SignPdfError';

jest.mock('./findObject', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('createBufferPageWithAnnotation', () => {
    it('Adds annotation to an existing array', () => {
        findObject.mockImplementation(() => (
            '/Annots [1 0 R]\n/Something [ELSE HERE]'
        ));
        const info = {xref: {}};
        info.xref.offsets = new Map();
        info.xref.offsets.set(1, 1);
        const buffer = createBufferPageWithAnnotation(
            'pdf',
            info,
            '1 0 R',
            '2 0 R',
        );
        expect(buffer.toString().indexOf('/Annots [1 0 R 2 0 R]')).not.toBe(-1);
    });
});
