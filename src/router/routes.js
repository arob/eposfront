import MainLayout from 'layouts/Main'
import PrintLayout from 'layouts/Print'
import Index from 'pages/Index'
import Dashboard from 'pages/Dashboard'
import Company from 'pages/Company'
import SalesInvoice from 'pages/SalesInvoice'
import SalesInvoiceList from 'pages/SalesInvoiceList'
import SalesInvoiceDetail from 'pages/SalesInvoiceDetail'
import SalesInvoiceUpdate from 'pages/SalesInvoiceUpdate'
import PrintSalesInvoice from 'pages/PrintSalesInvoice'
import Customer from 'pages/Customer'
import CustomerDetail from 'pages/CustomerDetail'
import Product from 'pages/Product'
import ProductDetail from 'pages/ProductDetail'
import PurchaseInvoice from 'pages/PurchaseInvoice'
import PurchaseInvoiceDetail from 'pages/PurchaseInvoiceDetail'
import PurchaseInvoiceList from 'pages/PurchaseInvoiceList'
import PurchaseInvoiceUpdate from 'pages/PurchaseInvoiceUpdate'
import Manufacturer from 'pages/Manufacturer'
import Supplier from 'pages/Supplier'
import SupplierDetail from 'pages/SupplierDetail'
import TagsUom from 'pages/TagsUom'
import Places from 'pages/Places'
import User from 'pages/User'
import Login from 'pages/Login'
import UserProfile from 'pages/UserProfile'
import AccHeads from 'pages/AccHeads'
import AccVoucher from 'pages/AccVoucher'
import Experiment from 'pages/Experiment'

let routes = [
  {
    path: '/',
    component: MainLayout,
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
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true
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
        component: SalesInvoiceList,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'sales-invoice-update',
        path: '/sales-invoice-update/:id',
        component: SalesInvoiceUpdate,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'sales-invoice-detail',
        path: '/sales-invoices/:id',
        component: SalesInvoiceDetail,
        meta: {
          requiresAuth: true
        }
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
        component: CustomerDetail,
        meta: {
          requiresAuth: true
        }
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
        component: PurchaseInvoice,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'purchase-invoice-detail',
        path: '/purchase-invoice/:id',
        component: PurchaseInvoiceDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'purchase-invoice-update',
        path: '/purchase-invoice-update/:id',
        component: PurchaseInvoiceUpdate,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'purchase-invoice-list',
        path: '/purchase-invoice-list',
        component: PurchaseInvoiceList,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'suppliers',
        path: '/suppliers',
        component: Supplier,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'supplier-detail',
        path: '/suppliers-detail/:id',
        component: SupplierDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'manufacturer',
        path: '/manufacturers',
        component: Manufacturer,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'login',
        path: '/login',
        component: Login
      },
      {
        name: 'profile',
        path: '/profile',
        component: UserProfile,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'products',
        path: '/products',
        component: Product,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'product-detail',
        path: '/product-detail/:id',
        component: ProductDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'company',
        path: '/company',
        component: Company
      },
      {
        name: 'user',
        path: '/user',
        component: User,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'acc-heads',
        path: '/acc-heads',
        component: AccHeads,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'acc-voucher',
        path: '/acc-voucher',
        component: AccVoucher,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'experiments',
        path: '/experiments',
        component: Experiment
      }
    ]
  },
  {
    path: '/',
    component: PrintLayout,
    children: [
      {
        name: 'print-sales-invoice',
        path: '/print/sales-invoices/:id',
        component: PrintSalesInvoice
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
