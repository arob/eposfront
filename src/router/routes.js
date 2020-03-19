import MainLayout from 'layouts/Main'
import PrintLayout from 'layouts/Print'
import Index from 'pages/Index'
import Dashboard from 'pages/Dashboard'
import Company from 'pages/master/Company'
import SalesInvoice from 'pages/SalesInvoice'
import SalesInvoiceList from 'pages/SalesInvoiceList'
import SalesInvoiceDetail from 'pages/SalesInvoiceDetail'
import SalesInvoiceUpdate from 'pages/SalesInvoiceUpdate'
import Customer from 'pages/master/Customer'
import CustomerDetail from 'pages/CustomerDetail'
import Product from 'pages/master/Product'
import ProductDetail from 'pages/ProductDetail'
import PurchaseInvoice from 'pages/PurchaseInvoice'
import PurchaseInvoiceDetail from 'pages/PurchaseInvoiceDetail'
import PurchaseInvoiceList from 'pages/PurchaseInvoiceList'
import PurchaseInvoiceUpdate from 'pages/PurchaseInvoiceUpdate'
import Manufacturer from 'pages/master/Manufacturer'
import Supplier from 'pages/master/Supplier'
import SupplierDetail from 'pages/SupplierDetail'
import TagsCapacity from 'pages/TagsCapacity'
import Places from 'pages/master/Places'
import User from 'pages/User'
import Login from 'pages/Login'
import UserProfile from 'pages//master/UserProfile'
import AccHeads from 'pages/AccHeads'
import AccVoucher from 'pages/AccVoucher'
import Experiment from 'pages/Experiment'
import PrintSalesInvoice from 'pages/reports/PrintSalesInvoice'
import PurchaseReport from 'pages/reports/PurchaseReport'
import SalesInvoiceReport from 'pages/reports/SalesInvoiceReport'
import ProductStockReport from 'pages/reports/ProductStockReport'

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
        name: 'tags-and-capacity',
        path: '/tags-and-capacity',
        component: TagsCapacity
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
      },
      {
        name: 'purchase-report',
        path: '/purchase-report',
        component: PurchaseReport,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'sales-invoice-report',
        path: '/sales-invoice-report',
        component: SalesInvoiceReport,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'product-stock-report',
        path: '/product-stock-report',
        component: ProductStockReport,
        meta: {
          requiresAuth: true
        }
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
