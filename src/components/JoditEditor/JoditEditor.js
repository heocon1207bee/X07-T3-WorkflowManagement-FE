import React, { useRef } from 'react';
import Jodit from 'jodit-react';
import axios from 'axios';
import { Buffer } from 'buffer';

const config = {
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUD_API_KEY,
    api_secret: process.env.REACT_APP_CLOUD_API_SECRET,
    upload_preset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
    folder: process.env.REACT_APP_CLOUD_FOLDER,
};

const JoditEditor = ({ value, onChange }) => {
    const editor = useRef(null);

    const handleImageUpload = (image) => {
        if (image.tagName === 'IMG' && image.src.startsWith('data:')) {
            const base64String = image.src.split(',')[1];
            const buffer = Buffer.from(base64String, 'base64');
            const formData = new FormData();

            const mimeType = base64String.split(';')[0].split(':')[1];
            const fileExtension = base64String.split('/')[1].split(';')[0];

            const fileName = `image.${fileExtension}`;
            const fileType = mimeType;

            const file = new File([buffer], fileName, { type: fileType });
            formData.append('file', file);
            formData.append('folder', config.folder);
            axios
                .post(`https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        api_key: `${config.api_key}`,
                        api_secret: `${config.api_secret}`,
                        upload_preset: `${config.upload_preset}`,
                    },
                })
                .then(function (response) {
                    image.src = response.data.secure_url;
                });
        }
    };

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
                events: {
                    afterInsertImage: handleImageUpload,
                },
            }}
        />
    );
};

export default JoditEditor;
