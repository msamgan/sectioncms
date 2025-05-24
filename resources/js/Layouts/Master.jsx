import Footer from '@/Components/layout/Footer.jsx'
import TopHeader from '@/Components/layout/TopHeader.jsx'
import TopMenu from '@/Components/layout/TopMenu.jsx'
import { Head, usePage } from '@inertiajs/react'

export default function Master({ children, hideMenu = false }) {
    const { auth } = usePage().props

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/assets/vendor/libs/node-waves/node-waves.css" />
                <link rel="stylesheet" href="/assets/vendor/css/rtl/core.css" />
                <link rel="stylesheet" href="/assets/vendor/css/rtl/theme-default.css" />
                <link rel="stylesheet" href="/assets/css/demo.css" />

                <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
                <link rel="stylesheet" href="/assets/vendor/libs/spinkit/spinkit.css" />

                <script src="/assets/vendor/js/helpers.js"></script>
                <script src="/assets/js/config.js"></script>

                <script src="/assets/vendor/libs/jquery/jquery.js"></script>
                <script src="/assets/vendor/libs/popper/popper.js"></script>
                <script src="/assets/vendor/js/bootstrap.js"></script>
                <script src="/assets/vendor/libs/node-waves/node-waves.js"></script>
                <script src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
                <script src="/assets/vendor/libs/hammer/hammer.js"></script>

                <script src="/assets/vendor/js/menu.js"></script>

                <script src="/assets/js/main.js"></script>
            </Head>
            <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
                <div className="layout-container">
                    <TopHeader user={auth.user} />

                    <div className="layout-page">
                        <div className="content-wrapper">
                            {!hideMenu && <TopMenu />}

                            <div className="container-xxl flex-grow-1 container-p-y">{children}</div>

                            <Footer />
                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
