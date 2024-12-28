/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnprotectedImport } from './routes/_unprotected'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as UnprotectedIndexImport } from './routes/_unprotected/index'
import { Route as UnprotectedTermsAndConditionImport } from './routes/_unprotected/terms-and-condition'
import { Route as UnprotectedPrivacyPolicyImport } from './routes/_unprotected/privacy-policy'
import { Route as AuthLayoutImport } from './routes/_auth/_layout'
import { Route as ProtectedDashboardIndexImport } from './routes/_protected/dashboard/index'
import { Route as AuthLayoutVerifyEmailImport } from './routes/_auth/_layout.verify-email'
import { Route as AuthLayoutRegisterImport } from './routes/_auth/_layout.register'
import { Route as AuthLayoutLoginImport } from './routes/_auth/_layout.login'
import { Route as AuthLayoutForgotPasswordImport } from './routes/_auth/_layout.forgot-password'
import { Route as AuthLayoutConfirmPasswordImport } from './routes/_auth/_layout.confirm-password'

// Create/Update Routes

const UnprotectedRoute = UnprotectedImport.update({
  id: '/_unprotected',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const UnprotectedIndexRoute = UnprotectedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UnprotectedRoute,
} as any)

const UnprotectedTermsAndConditionRoute =
  UnprotectedTermsAndConditionImport.update({
    id: '/terms-and-condition',
    path: '/terms-and-condition',
    getParentRoute: () => UnprotectedRoute,
  } as any)

const UnprotectedPrivacyPolicyRoute = UnprotectedPrivacyPolicyImport.update({
  id: '/privacy-policy',
  path: '/privacy-policy',
  getParentRoute: () => UnprotectedRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_auth/_layout',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedDashboardIndexRoute = ProtectedDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => ProtectedRoute,
} as any)

const AuthLayoutVerifyEmailRoute = AuthLayoutVerifyEmailImport.update({
  id: '/verify-email',
  path: '/verify-email',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutRegisterRoute = AuthLayoutRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutLoginRoute = AuthLayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutForgotPasswordRoute = AuthLayoutForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutConfirmPasswordRoute = AuthLayoutConfirmPasswordImport.update({
  id: '/confirm-password',
  path: '/confirm-password',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/_unprotected': {
      id: '/_unprotected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnprotectedImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout': {
      id: '/_auth/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_unprotected/privacy-policy': {
      id: '/_unprotected/privacy-policy'
      path: '/privacy-policy'
      fullPath: '/privacy-policy'
      preLoaderRoute: typeof UnprotectedPrivacyPolicyImport
      parentRoute: typeof UnprotectedImport
    }
    '/_unprotected/terms-and-condition': {
      id: '/_unprotected/terms-and-condition'
      path: '/terms-and-condition'
      fullPath: '/terms-and-condition'
      preLoaderRoute: typeof UnprotectedTermsAndConditionImport
      parentRoute: typeof UnprotectedImport
    }
    '/_unprotected/': {
      id: '/_unprotected/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof UnprotectedIndexImport
      parentRoute: typeof UnprotectedImport
    }
    '/_auth/_layout/confirm-password': {
      id: '/_auth/_layout/confirm-password'
      path: '/confirm-password'
      fullPath: '/confirm-password'
      preLoaderRoute: typeof AuthLayoutConfirmPasswordImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/forgot-password': {
      id: '/_auth/_layout/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthLayoutForgotPasswordImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/login': {
      id: '/_auth/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLayoutLoginImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/register': {
      id: '/_auth/_layout/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthLayoutRegisterImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/verify-email': {
      id: '/_auth/_layout/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof AuthLayoutVerifyEmailImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_protected/dashboard/': {
      id: '/_protected/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof ProtectedDashboardIndexImport
      parentRoute: typeof ProtectedImport
    }
  }
}

// Create and export the route tree

interface ProtectedRouteChildren {
  ProtectedDashboardIndexRoute: typeof ProtectedDashboardIndexRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedDashboardIndexRoute: ProtectedDashboardIndexRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

interface UnprotectedRouteChildren {
  UnprotectedPrivacyPolicyRoute: typeof UnprotectedPrivacyPolicyRoute
  UnprotectedTermsAndConditionRoute: typeof UnprotectedTermsAndConditionRoute
  UnprotectedIndexRoute: typeof UnprotectedIndexRoute
}

const UnprotectedRouteChildren: UnprotectedRouteChildren = {
  UnprotectedPrivacyPolicyRoute: UnprotectedPrivacyPolicyRoute,
  UnprotectedTermsAndConditionRoute: UnprotectedTermsAndConditionRoute,
  UnprotectedIndexRoute: UnprotectedIndexRoute,
}

const UnprotectedRouteWithChildren = UnprotectedRoute._addFileChildren(
  UnprotectedRouteChildren,
)

interface AuthLayoutRouteChildren {
  AuthLayoutConfirmPasswordRoute: typeof AuthLayoutConfirmPasswordRoute
  AuthLayoutForgotPasswordRoute: typeof AuthLayoutForgotPasswordRoute
  AuthLayoutLoginRoute: typeof AuthLayoutLoginRoute
  AuthLayoutRegisterRoute: typeof AuthLayoutRegisterRoute
  AuthLayoutVerifyEmailRoute: typeof AuthLayoutVerifyEmailRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutConfirmPasswordRoute: AuthLayoutConfirmPasswordRoute,
  AuthLayoutForgotPasswordRoute: AuthLayoutForgotPasswordRoute,
  AuthLayoutLoginRoute: AuthLayoutLoginRoute,
  AuthLayoutRegisterRoute: AuthLayoutRegisterRoute,
  AuthLayoutVerifyEmailRoute: AuthLayoutVerifyEmailRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthLayoutRouteWithChildren
  '/privacy-policy': typeof UnprotectedPrivacyPolicyRoute
  '/terms-and-condition': typeof UnprotectedTermsAndConditionRoute
  '/': typeof UnprotectedIndexRoute
  '/confirm-password': typeof AuthLayoutConfirmPasswordRoute
  '/forgot-password': typeof AuthLayoutForgotPasswordRoute
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
  '/verify-email': typeof AuthLayoutVerifyEmailRoute
  '/dashboard': typeof ProtectedDashboardIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthLayoutRouteWithChildren
  '/privacy-policy': typeof UnprotectedPrivacyPolicyRoute
  '/terms-and-condition': typeof UnprotectedTermsAndConditionRoute
  '/': typeof UnprotectedIndexRoute
  '/confirm-password': typeof AuthLayoutConfirmPasswordRoute
  '/forgot-password': typeof AuthLayoutForgotPasswordRoute
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
  '/verify-email': typeof AuthLayoutVerifyEmailRoute
  '/dashboard': typeof ProtectedDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/_unprotected': typeof UnprotectedRouteWithChildren
  '/_auth/_layout': typeof AuthLayoutRouteWithChildren
  '/_unprotected/privacy-policy': typeof UnprotectedPrivacyPolicyRoute
  '/_unprotected/terms-and-condition': typeof UnprotectedTermsAndConditionRoute
  '/_unprotected/': typeof UnprotectedIndexRoute
  '/_auth/_layout/confirm-password': typeof AuthLayoutConfirmPasswordRoute
  '/_auth/_layout/forgot-password': typeof AuthLayoutForgotPasswordRoute
  '/_auth/_layout/login': typeof AuthLayoutLoginRoute
  '/_auth/_layout/register': typeof AuthLayoutRegisterRoute
  '/_auth/_layout/verify-email': typeof AuthLayoutVerifyEmailRoute
  '/_protected/dashboard/': typeof ProtectedDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/privacy-policy'
    | '/terms-and-condition'
    | '/'
    | '/confirm-password'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/verify-email'
    | '/dashboard'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/privacy-policy'
    | '/terms-and-condition'
    | '/'
    | '/confirm-password'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/verify-email'
    | '/dashboard'
  id:
    | '__root__'
    | '/_protected'
    | '/_unprotected'
    | '/_auth/_layout'
    | '/_unprotected/privacy-policy'
    | '/_unprotected/terms-and-condition'
    | '/_unprotected/'
    | '/_auth/_layout/confirm-password'
    | '/_auth/_layout/forgot-password'
    | '/_auth/_layout/login'
    | '/_auth/_layout/register'
    | '/_auth/_layout/verify-email'
    | '/_protected/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProtectedRoute: typeof ProtectedRouteWithChildren
  UnprotectedRoute: typeof UnprotectedRouteWithChildren
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  ProtectedRoute: ProtectedRouteWithChildren,
  UnprotectedRoute: UnprotectedRouteWithChildren,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected",
        "/_unprotected",
        "/_auth/_layout"
      ]
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/dashboard/"
      ]
    },
    "/_unprotected": {
      "filePath": "_unprotected.tsx",
      "children": [
        "/_unprotected/privacy-policy",
        "/_unprotected/terms-and-condition",
        "/_unprotected/"
      ]
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.tsx",
      "children": [
        "/_auth/_layout/confirm-password",
        "/_auth/_layout/forgot-password",
        "/_auth/_layout/login",
        "/_auth/_layout/register",
        "/_auth/_layout/verify-email"
      ]
    },
    "/_unprotected/privacy-policy": {
      "filePath": "_unprotected/privacy-policy.tsx",
      "parent": "/_unprotected"
    },
    "/_unprotected/terms-and-condition": {
      "filePath": "_unprotected/terms-and-condition.tsx",
      "parent": "/_unprotected"
    },
    "/_unprotected/": {
      "filePath": "_unprotected/index.tsx",
      "parent": "/_unprotected"
    },
    "/_auth/_layout/confirm-password": {
      "filePath": "_auth/_layout.confirm-password.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/forgot-password": {
      "filePath": "_auth/_layout.forgot-password.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/login": {
      "filePath": "_auth/_layout.login.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/register": {
      "filePath": "_auth/_layout.register.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/verify-email": {
      "filePath": "_auth/_layout.verify-email.tsx",
      "parent": "/_auth/_layout"
    },
    "/_protected/dashboard/": {
      "filePath": "_protected/dashboard/index.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
