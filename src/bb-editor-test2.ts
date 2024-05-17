import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string;
    @state() saved: boolean = false;
    @query('.editor') editor: HTMLDivElement;

    private quill?: Quill;

    static styles = css`
        :host {
            display: block;
            padding: 20px;
        }
        .editor { 
            height: 300px; 
        }
        button {
            margin-top: 10px;
        }
    `;

    // Utilize the Light DOM instead of the Shadow DOM
    createRenderRoot() {
        return this;
    }

    firstUpdated() {
        const options = {
            placeholder: 'écrivez ici',
            theme: 'snow'
        };

        this.quill = new Quill(this.editor, options);
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
            <br>
            <button @click="${this.saveContent}">Save</button>
        `;
    }

    saveContent() {
        const content = this.quill?.root.innerHTML; // Get the HTML content from Quill
        // Dispatch a custom event with the content
        this.dispatchEvent(new CustomEvent('content-saved', {
            detail: { content },
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        }));
    }
}
