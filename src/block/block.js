/**
 * BLOCK: cuttlesoft-blurb
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PlainText, RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-cuttlesoft-blurb', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Cuttlesoft Blurb' ), // Block title.
	icon: 'text', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cuttlesoft' ),
		__( 'CGB' ),
		__( 'create-guten-block' ),
		__( 'blurb' )
	],
	attributes: {
    header: {
      selector: 'h2',
      source: 'children'
    },
    paragraph: {
      selector: 'p',  // tag a
      source: 'children'
    },
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		var header = props.attributes.header
    var paragraph = props.attributes.paragraph

    function onChangeHeader ( content ) {
        props.setAttributes({header: content})
    }

    function onChangeParagraph ( content ) {
        props.setAttributes({paragraph: content})
    }

		return (
			<div className={ props.className }>
				<div>
					<RichText
						tagName="h2"
						onChange={onChangeHeader}
						value={header}
	          placeholder="Header text" />
					<PlainText
						onChange={onChangeParagraph}
						value={paragraph}
	          placeholder="Write paragraph here." />
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<div>
					<h2>{props.attributes.header}</h2>
					<p>{props.attributes.paragraph}</p>
				</div>
			</div>
		);
	},
} );
