import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string;
    @state() saved: boolean;

    private quill?: Quill;

    static styles = css`
        :host {
            display: block;
            padding: 20px;
        }
        .editor { 
            height: 300px; 
        }
    `;

    firstUpdated() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                                        // remove formatting button
            ['link', 'image', 'video', 'formula']             // link and image, video
        ];

        const options = {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'écrire ici :)',
            theme: 'snow'
        };


        this.quill = new Quill(this.querySelector(".editor") as HTMLElement, options);
        
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
        `;
    }

}
