declare namespace utils {
    function btou(buffer: BufferSource): string

    function findStringInTypedArray(arr: Uint8Array, str: string): number

    function kmp(str: string | Array, patt: string | Array): number

    function mbLength(str: string): number

    function treeDir(dir: string): Promise<any>

    function utob(str: string): Uint8Array
}
