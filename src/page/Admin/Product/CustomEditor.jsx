import { Editor } from '@tinymce/tinymce-react'
import { Form } from 'antd'

const CustomEditor = ({ name, label, initialValue, rules }) => {
    return (
        <Form.Item
            name={name}
            label={
                <span className="text-gray-700 font-medium">{label}</span>
            }
            rules={rules}
        >
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
        </Form.Item>
    )
}

export default CustomEditor
