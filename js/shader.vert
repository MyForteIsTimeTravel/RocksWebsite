attribute vec3 vertPos;
attribute vec3 vertCol;
attribute vec2 vertTC;

varying vec3 fragCol;
varying vec2 fragTC;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main (void) {
    fragCol = vertCol;
    fragTC = vertTC;
    gl_Position = projection * view * model * vec4(vertPos, 1.0);
}