import Jodit from 'jodit-react';
import { useEffect, useRef, useState } from 'react';

const config = {
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUD_API_KEY,
    api_secret: process.env.REACT_APP_CLOUD_API_SECRET,
    upload_preset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
    folder: process.env.REACT_APP_CLOUD_FOLDER,
};

const JoditEditor = () => {
    const [content, setContent] = useState('');
    const editor = useRef(null);
    useEffect(() => {
        editor.current.focus();
    }, [editor]);

    return (
        <Jodit
            ref={editor}
            value={content}
            useInput={true}
            tabIndex={-1}
            onChange={setContent}
            config={{
                placeholder: '',
                uploader: {
                    insertImageAsBase64URI: false,
                    provider: 'url',
                    url: `https://api.cloudinary.com/v1_1/${config.cloud_name}/upload`,
                    prepareData: (formData) => {
                        const file = formData.get('files[0]');
                        formData.append('file', file);
                        formData.append('upload_preset', config.upload_preset);
                        formData.append('folder', config.folder);
                        return formData;
                    },
                    getMessage: (type, def) => {
                        if (type === 'isSuccess') {
                            return 'File was successfully uploaded';
                        }
                        if (type === 'isError') {
                            return 'An error occurred while uploading the file';
                        }
                        return def;
                    },
                    isSuccess: (response) => {
                        editor.current.component.selection.insertImage(response.secure_url, response.public_id);
                    },
                },
            }}
        />
    );
};

export default JoditEditor;
