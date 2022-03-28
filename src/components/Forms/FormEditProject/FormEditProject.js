import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import {useDispatch,useSelector,connect} from 'react-redux'
import * as Yup from 'yup';   //import thang nay de bat validate

function FormEditProject(props) {

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

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit');
    // }

    //componentdismount
    useEffect(()=>{
        setFieldValue('description',values.description)
        //Gọi api load project category
        dispatch({type:'GET_ALL_PROJECT_CATEGORY_SAGA'})

        //Load sự kiện submit lên drawer nút submit
        dispatch({type:'SET_SUBMIT_EDIT_PROJECT', sumitFunction:handleSubmit})
    },[])

    

    const handleEditorChange = (content, editor) => {
        setFieldValue('description',content)
        
    }

    return (
        <div className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project id</p>
                        <input value={values.id} disabled className='form-control' name='id' />
                    </div>
                </div>

                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project name</p>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>

                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Category</p>
                        <select className='form-control'  name="categoryId" value={values.categoryId}>
                                {arrProjectCategory?.map((item,index)=>{
                                    return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                                })}
                        </select>
                    </div>
                </div>

                <div className='col-12'>
                <div className='form-group'>
                <p className='font-weight-bold'>Description</p>
                <Editor
                    name="description123"
                        // onInit={(evt, editor) => editorRef.current = editor}
                        // initialValue={values.description}
                        value={values.description}
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
                </div>

            </div>
        </div>
    )
}


const EditProjectForm = withFormik({
    enableReinitialize:true,  //khi thuoc tinh nay duoc kich len, thi moi lan prop cua redux thay thi lap tuc binding gia tri cua object nay
    mapPropsToValues: (props) => {
        console.log('propsvalue', props)
        const {projectEdit} = props
        return {
            id:projectEdit?.id,
            projectName:projectEdit.projectName,
            description:projectEdit.description,
            categoryId:projectEdit.categoryId
        }
    },
  
    validationSchema: Yup.object().shape({


    }),

    handleChange: (values, { setSubmitting }) => {    //ham nay bi huy bo trong prop nen goi ko duoc, bat buoc phai co ham handlechange moi lay duoc gia tri value        console.log(values);
      
    },
  
    handleSubmit: (values, {props, setSubmitting }) => {
        // console.log('props',values)
    //Khi người dùng bấm submit => đưa dữ liệu về backend thông qua api
        // const action = {
        //     type: 'UPDATE_PROJECT_SAGA',
        //     projectUpdate:values
        // }
        //Gọi saga
        props.dispatch({
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate:values
        })

        
    },
  
    displayName: 'EditProjectForm',
  })(FormEditProject);

  const mapStateToProps = (state) => {
      return {
        projectEdit : state.ProjectReducer.projectEdit
    }
  }



export default connect (mapStateToProps) (EditProjectForm)