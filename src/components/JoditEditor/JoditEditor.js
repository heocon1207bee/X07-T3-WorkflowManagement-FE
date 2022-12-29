import React, { useRef } from 'react';
import Jodit from 'jodit-react';

const JoditEditor = ({ value, onChange }) => {
    const editor = useRef(null);

    return (
        <Jodit
            editorRef={editor}
            value={value}
            onChange={onChange}
            config={{
                placeholder: '',
                uploader: {
                    insertImageAsBase64URI: true,
                },
            }}
        />
    );
};

export default JoditEditor;
