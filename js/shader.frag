precision highp float;
varying vec3 fragCol;
varying vec2 fragTC;
uniform sampler2D sampler;
void main (void) {
    //gl_FragColor = vec4(fragCol, 1.0);
    gl_FragColor = texture2D(sampler, fragTC);
}