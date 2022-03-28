import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {withFormik} from 'formik';
import * as Yup from 'yup';   //import thang nay de bat validate
import {connect,useSelector,useDispatch} from 'react-redux';


function CreateProject(props) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
    const dispatch = useDispatch();
            console.log('ket qua',arrProjectCategory)
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue

      } = props;

      useEffect(()=>{
        //Goi api de lay du lieu the select
        dispatch({type:'GET_ALL_PROJECT_CATEGORY_SAGA'})
      },[])


    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        console.log('Content was updated:', editor);
        console.log(props)
        setFieldValue('description',content)
        
    }


    return (
        <div className='container m-5'>
            <h3 className=''>CreateProject</h3>
            <form className='conntainer' onSubmit={handleSubmit} onChange={handleChange}> 
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    {/* <input className='form-control' name='projectName' /> */}
                    <Editor
                    name="description"
                        // onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className='form-group'>
                    <select name="categoryId" className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item,index)=> {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                        {/* <option>Software</option>
                        <option>Web</option>
                        <option>App</option> */}
                    </select>
                </div>
                <button className='btn btn-outline-primary' type="submit">Create project</button>
            </form>
        </div>
    )
}


const createProjectForm = withFormik({
    enableReinitialize:true,  //khi thuoc tinh nay duoc kich len, thi moi lan prop cua redux thay thi lap tuc binding gia tri cua object nay
    mapPropsToValues: (props) => {

        console.log('propsvalue', props)
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id,   //dung toan tu  optional chaining .? neu co thuoc tinh nay .id, ko co thi nha ve undifined
        }
    },
  
    validationSchema: Yup.object().shape({


    }),

    handleChange: (values, { setSubmitting }) => {    //ham nay bi huy bo trong prop nen goi ko duoc, bat buoc phai co ham handlechange moi lay duoc gia tri value        console.log(values);
      
    },
  
    handleSubmit: (values, {props, setSubmitting }) => {
        // console.log('props',values)
        props.dispatch({
            type:'CREATE_PROJECT_SAGA',
            newProject:values
        })
    },
  
    displayName: 'createProjectForm',
  })(CreateProject);

  const mapStateToProps = (state) => {
      return {
        arrProjectCategory:state.ProjectCategoryReducer.arrProjectCategory
      }
  }



export default connect (mapStateToProps) (createProjectForm)