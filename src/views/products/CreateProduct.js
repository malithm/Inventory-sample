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
import ProductService from '../../services/ProductService';
import ProductCategoryService from '../../services/ProductCategoryService';
import ProductManufacturersService from '../../services/ProductManufacturerService';
import ProductMeasureTypeService from '../../services/ProductMeasureTypeService';

class CreateProduct extends Component{

  constructor(props){
    super (props);

    this.state = {
      productName: '',
      productDesc: '',
      productModel: '',
      productCategories: [],
      productManufacturers: [],
      productMeasureTypes: []
    }
    this.saveProduct = this.saveProduct.bind(this);
  }

  componentDidMount(){
    ProductCategoryService.getProductCategories().then((res) => {
        this.setState({ productCategories: res.data});
    })

    ProductManufacturersService.getProductManufacturers().then((res) => {
        this.setState({ productManufacturers: res.data});
    })

    ProductMeasureTypeService.getProductMeasureTypes().then((res) => {
      this.setState({ productMeasureTypes: res.data})
    })
  }

  saveProduct = (event) => {
    event.preventDefault();
    let product = {
      productName: this.state.productName,
      productDesc: this.state.productDesc,
      productCategory: this.state.productCategory,
      productManufacturer: this.state.productManufacturer,
      productModel: this.state.productModel,
      productMeasureType: this.state.productMeasureType
    }

    ProductService.createProduct(product).then(res => {
      this.props.history.push('/products');
    });
  }

  cancel(){
      this.setState({
        productName: '',
        productDesc: '',
        productCategory:'',
        productManufacturer:'',
        productModel:'',
        productMeasureType:''
      })
  }

  changeProductNameHandler = (event) => {
    this.setState({productName: event.target.value})
  }
  changeProductDescHandler = (event) => {
    this.setState({productDesc: event.target.value})
  }
  changeProductModelHandler = (event) => {
    this.setState({productModel: event.target.value})
  }
  changeProductCategoryHandler = (event) => {
    this.setState({productCategory: event.target.value})
  }
  changeProductManufacturerHandler = (event) => {
    this.setState({productManufacturer: event.target.value})
  }
  changeProductMeasureTypeHandler = (event) => {
    this.setState({productMeasureType: event.target.value})
  }

  render(){
    return (
      <CRow>
      <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              ADD NEW PRODUCT
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="name">Product Name</CLabel>
                    <CInput id="name" placeholder="Enter product name" name="productName" value={this.state.productName}
                                    onChange={this.changeProductNameHandler} required />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup row>
                      <CLabel htmlFor="textarea-input">Product Description</CLabel>
                      <CTextarea 
                        name="productDesc" 
                        id="textarea-input"
                        placeholder="Enter product description"
                        value={this.state.productDesc}
                        onChange={this.changeProductDescHandler} 
                      />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="model">Model</CLabel>
                    <CInput id="model" placeholder="Enter model name" name="productModel" value={this.state.productModel}
                                    onChange={this.changeProductModelHandler} required />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="productCategory">Product Category</CLabel>
                    <CSelect custom name="productCategory" id="productCategory" defaultValue="" value={this.state.productCategory}
                                    onChange={this.changeProductCategoryHandler}>
                      <option selected disabled>Select product category</option>
                      {
                        this.state.productCategories.map(
                          productCategory => <option value={productCategory.id}>{productCategory.categoryName}</option>
                        )
                      }                      
                    </CSelect>
                    <a href=""> + Add new product category</a>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                <CFormGroup>
                    <CLabel htmlFor="productManufacturer">Manufacturer</CLabel>
                    <CSelect custom name="productManufacturer" id="productManufacturer" value={this.state.productManufacturer}
                                    onChange={this.changeProductManufacturerHandler}>
                      <option selected disabled>Select product manufacturer</option>
                      {
                        this.state.productManufacturers.map(
                          productManufacture => <option value={productManufacture.id}>{productManufacture.manufacturerName}</option>
                        )
                      }
                    </CSelect>
                    <a href=""> + Add new manufacturer</a>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                <CFormGroup>
                    <CLabel htmlFor="productMeasureType">Measuring Type</CLabel>
                    <CSelect custom name="productMeasureType" id="productMeasureType" value={this.state.productMeasureType}
                                    onChange={this.changeProductMeasureTypeHandler}>
                      <option selected disabled>Select product measure type</option>
                      {
                        this.state.productMeasureTypes.map(
                          productMeasureType => <option value={productMeasureType.id}>{productMeasureType.productMeasureTypeName}</option>
                        )
                      }
                    </CSelect>
                    <a href=""> + Add new measuring type</a>
                  </CFormGroup>
                </CCol>
              </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="md" color="success" onClick={this.saveProduct}>Submit</CButton>&nbsp;
              <CButton type="reset" size="md" color="danger" onClick={this.cancel.bind(this)}>Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default CreateProduct