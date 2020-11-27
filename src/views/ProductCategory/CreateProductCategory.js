import React, {Component} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class CreateProductCategory extends Component {
  
    constructor(props){
        super (props);

        this.state = {
            categoryName: '',
            categoryDesc: '',
            productCategories: []
        }
        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.changeCategoryDescHandler = this.changeCategoryDescHandler.bind(this);
        this.saveProductCategory = this.saveProductCategory.bind(this);
    }

    saveProductCategory = (event) => {
        event.preventDefault();
        let productCategory = {
            categoryName: this.state.categoryName,
            categoryDesc: this.state.categoryDesc
        }
    }

    cancel(){
        this.setState({
            categoryName: '',
            categoryDesc: ''
        })
    }

    changeCategoryNameHandler = (event) => {
        this.setState({categoryName: event.target.value})
    }

    changeCategoryDescHandler = (event) => {
        this.setState({categoryDesc: event.target.value})
    }
  
  render(){
    return (
        <>
          <CRow>
          <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  ADD NEW PRODUCT CATEGORY
                </CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" className="form-horizontal">
                        <CRow>
                            <CCol xs="6">
                            <CFormGroup>
                                <CLabel htmlFor="name">Product Category Name</CLabel>
                                <CInput
                                 id="name"
                                 placeholder="Enter product name"
                                 name="categoryName" 
                                 value={this.state.categoryName}
                                 onChange={this.changeCategoryNameHandler}
                                 required
                                />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                            <CFormGroup row>
                                <CLabel htmlFor="textarea-input">Product Category Description</CLabel>
                                <CTextarea 
                                    name="categoryDesc" 
                                    id="textarea-input"
                                    placeholder="Enter product description"
                                    value={this.state.categoryName}
                                    onChange={this.changeCategoryDescHandler}
                                    required 
                                />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                    </CRow>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton type="submit" size="md" color="success" onClick={this.saveProductCategory}>Submit</CButton>&nbsp;
                  <CButton type="reset" size="md" color="danger" onClick={this.cancel.bind(this)}>Reset</CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </>
      )
  }
  
}

export default CreateProductCategory