import { Editor } from '@tinymce/tinymce-react'

const CustomEditor = ({ initialValue }) => {
    return (
        <Editor
            apiKey='juxal06e7lhubtmlsbs3sp3p45rznn7e54a6bqoqxvjlpaax'
            initialValue={initialValue}
            // onEditorChange
            init={{
                height: 200,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    )
}

export default CustomEditor
