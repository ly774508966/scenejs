/**
 *
 */
SceneJS_ChunkFactory.createChunkType({

    type: "stencilBuffer",

    // Avoid reapplication of a chunk after a program switch.
    programGlobal: true,

    drawAndPick: function (frameCtx) {

        var gl = this.program.gl;

        var enabled = this.core.enabled;

        if (frameCtx.stencilbufEnabled != enabled) {
            if (enabled) {
                gl.enable(gl.STENCIL_TEST);
                //gl.stencilMask(0xff);
            } else {
                gl.disable(gl.STENCIL_TEST);
            }
            frameCtx.stencilbufEnabled = enabled;
        }

        var clearStencil = this.core.clearStencil;

        if (clearStencil !== undefined) {
            if (frameCtx.clearStencil != clearStencil) {
                gl.clearStencil(clearStencil);
                frameCtx.clearStencil = clearStencil;
            }
        }
        

        var stencilFuncFront = this.core.stencilFuncFront || frameCtx.stencilFuncFront;

        if (frameCtx.stencilFuncFront != stencilFuncFront) {
            gl.stencilFuncSeparate(gl.FRONT, stencilFuncFront.func, stencilFuncFront.ref, stencilFuncFront.mask);
            frameCtx.stencilFuncFront = stencilFuncFront;
        }

        var stencilFuncBack = this.core.stencilFuncBack || frameCtx.stencilFuncBack;
        if (frameCtx.stencilFuncBack != stencilFuncBack) {
            gl.stencilFuncSeparate(gl.BACK, stencilFuncBack.func, stencilFuncBack.ref, stencilFuncBack.mask);
            frameCtx.stencilFuncBack = stencilFuncBack;
        }


        var stencilOpFront = this.core.stencilOpFront || frameCtx.stencilOpFront;

        if (frameCtx.stencilOpFront != stencilOpFront) {
            gl.stencilOpSeparate(gl.FRONT, stencilOpFront.sfail, stencilOpFront.dpfail, stencilOpFront.dppass);
            frameCtx.stencilOpFront = stencilOpFront;
        }

        var stencilOpBack = this.core.stencilOpBack || frameCtx.stencilOpBack;

        if (frameCtx.stencilOpBack != stencilOpBack) {
            gl.stencilOpSeparate(gl.BACK, stencilOpBack.sfail, stencilOpBack.dpfail, stencilOpBack.dppass);
            frameCtx.stencilOpBack = stencilOpBack;
        }


        if (this.core.clear) {
            gl.clear(gl.STENCIL_BUFFER_BIT);
        }
    }
});
