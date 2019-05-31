import Index from 'pages/Index'
import SalesInvoice from 'pages/SalesInvoice'
import SalesInvoiceList from 'pages/SalesInvoiceList'
import SalesInvoiceDetail from 'pages/SalesInvoiceDetail'
import Customer from 'pages/Customer'
import CustomerDetail from 'pages/CustomerDetail'
import Product from 'pages/Product'
import ProductDetail from 'pages/ProductDetail'
import PurchaseInvoice from 'pages/PurchaseInvoice'
import PurchaseInvoiceDetail from 'pages/PurchaseInvoiceDetail'
import PurchaseInvoiceList from 'pages/PurchaseInvoiceList'
import Manufacturer from 'pages/Manufacturer'
import ManufacturerDetail from 'pages/ManufacturerDetail'
import Supplier from 'pages/Supplier'
import SupplierDetail from 'pages/SupplierDetail'
import TagsUom from 'pages/TagsUom'
import Places from 'pages/Places'
import Login from 'pages/Login'
import Experiment from 'pages/Experiment'

let routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        name: 'index',
        path: '/',
        component: Index,
        meta: {
          title: 'Home'
        }
      },
      {
        name: 'sales-invoice',
        path: '/sales-invoice',
        component: SalesInvoice,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'sales-invoice-list',
        path: '/sales-invoice-list',
        component: SalesInvoiceList
      },
      {
        name: 'sales-invoice-detail',
        path: '/sales-invoices/:id',
        component: SalesInvoiceDetail
      },
      {
        name: 'customers',
        path: '/customers',
        component: Customer,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'customer-detail',
        path: '/customers/:id',
        component: CustomerDetail
      },
      {
        name: 'places',
        path: '/places',
        component: Places
      },
      {
        name: 'tags-and-uom',
        path: '/tags-and-uoms',
        component: TagsUom
      },
      {
        name: 'purchase_invoice',
        path: '/purchase-invoice',
        component: PurchaseInvoice
      },
      {
        name: 'purchase-invoice-detail',
        path: '/purchase-invoice/:id',
        component: PurchaseInvoiceDetail
      },
      {
        name: 'purchase-invoice-list',
        path: '/purchase-invoice-list',
        component: PurchaseInvoiceList
      },
      {
        name: 'suppliers',
        path: '/suppliers',
        component: Supplier
      },
      {
        name: 'supplier-detail',
        path: '/suppliers-detail/:id',
        component: SupplierDetail
      },
      {
        name: 'manufacturer',
        path: '/manufacturers',
        component: Manufacturer
      },
      {
        name: 'manufacturer-detail',
        path: '/manufacturers/:id',
        component: ManufacturerDetail
      },
      {
        name: 'login',
        path: '/login',
        component: Login
      },
      {
        name: 'products',
        path: '/products',
        component: Product
      },
      {
        name: 'product-detail',
        path: '/product-detail/:id',
        component: ProductDetail
      },
      {
        name: 'experiments',
        path: '/experiments',
        component: Experiment
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
