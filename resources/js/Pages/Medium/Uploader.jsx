import React, { useState } from 'react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { store } from '@actions/MediumController.js'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation)

export default function Uploader({ getMedia }) {
    const [files, setFiles] = useState([])

    return (
        <div className={'mb-12 mt-5'}>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={5}
                fileSizeBase={1000}
                server={{
                    url: store.route(),
                    process: {
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf"]').getAttribute('content'),
                        },
                        onload: (response) => {
                            getMedia()
                        },
                    },
                }}
                name="file" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                allowRemove={false}
            />
        </div>
    )
}
