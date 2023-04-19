#version 300 es
precision mediump float;

in vec4 v_color;
in vec2 v_texCoord; // Receive texture coordinate from vertex shader

uniform sampler2D u_texture; // Add texture sampler

out vec4 fragColor;
void main() {
    vec4 texColor = texture(u_texture, v_texCoord); // Sample the texture
    //fragColor = v_color * texColor; // Multiply color with texture color

    fragColor = v_color;
}