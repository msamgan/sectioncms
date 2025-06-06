<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf" content="{{ csrf_token() }}" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <meta
            name="description"
            content="Section CMS is a powerful and flexible content management system built with Laravel and Inertia.js. It provides a modern, intuitive interface for managing your website's content, making it easy to create, edit, and publish content, pages, and more."
        />

        <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon/favicon.ico') }}" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <!-- Fonts -->
        {{--
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
            href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
            />
        --}}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="{{ 'https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css' }}" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <div id="preloader" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <p class="text-lg font-semibold text-gray-500">Loading...</p>
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>

        <!-- Drag Target Area To SlideIn Menu On Small Screens -->
        <div class="drag-target"></div>

        <script>
            // Hide the preloader once the page is fully loaded
            window.addEventListener('load', function () {
                setTimeout(() => {
                    document.getElementById('preloader').style.display = 'none'
                }, 500)
            })
        </script>
    </body>
</html>
