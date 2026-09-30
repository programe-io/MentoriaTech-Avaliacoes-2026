<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PixelVault - Games em Mídia Digital 24/7</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --bg-main: #070a13;
            --bg-card: #0f172a;
            --bg-card-hover: #1e293b;
            --border-color: #1e293b;
            --neon-purple: #9333ea;
            --neon-cyan: #06b6d4;
            --neon-pink: #ec4899;
            --neon-green: #10b981;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            background-image: radial-gradient(rgba(147, 51, 234, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
        }

        h1, h2, h3, h4, .font-gamer {
            font-family: 'Orbitron', sans-serif;
        }

        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-main);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--neon-purple);
        }

        header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(7, 10, 19, 0.85);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-color);
        }

        .nav-container {
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 24px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo-box {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
        }

        .logo-icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan));
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
            transition: var(--transition);
        }

        .logo-box:hover .logo-icon {
            transform: scale(1.05);
        }

        .logo-text h1 {
            font-size: 22px;
            font-weight: 900;
            letter-spacing: 1px;
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo-text span {
            font-size: 10px;
            color: var(--text-muted);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
        }

        .search-container {
            flex: 1;
            max-width: 450px;
            margin: 0 32px;
            position: relative;
        }

        .search-container input {
            width: 100%;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 9999px;
            padding: 12px 20px 12px 45px;
            color: var(--text-main);
            font-size: 14px;
            outline: none;
            transition: var(--transition);
        }

        .search-container input:focus {
            border-color: var(--neon-purple);
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.2);
        }

        .search-container i {
            position: absolute;
            left: 18px;
            top: 15px;
            color: var(--text-muted);
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .btn-action {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 10px 18px;
            border-radius: 14px;
            color: var(--text-main);
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            position: relative;
        }

        .btn-action:hover {
            background: var(--bg-card-hover);
            border-color: var(--neon-cyan);
        }

        .btn-primary-gradient {
            background: linear-gradient(135deg, var(--neon-purple), #6366f1);
            border: none;
            box-shadow: 0 4px 20px rgba(147, 51, 234, 0.3);
        }

        .btn-primary-gradient:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .badge-count {
            position: absolute;
            top: -6px;
            right: -6px;
            background: var(--neon-pink);
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }

        .toast-box {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            background: var(--bg-card);
            border: 1px solid rgba(147, 51, 234, 0.4);
            padding: 16px 20px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 14px;
            transform: translateY(120px);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
        }

        .toast-box.show {
            transform: translateY(0);
            opacity: 1;
        }

        .toast-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(147, 51, 234, 0.2);
            color: var(--neon-purple);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .toast-content h4 {
            font-size: 13px;
            font-weight: 700;
        }

        .toast-content p {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        main {
            flex: 1;
            max-width: 1300px;
            margin: 0 auto;
            width: 100%;
            padding: 32px 24px;
        }

        .hero-banner {
            position: relative;
            background: linear-gradient(135deg, #1e1b4b, #0f172a, #070a13);
            border: 1px solid var(--border-color);
            border-radius: 28px;
            padding: 48px;
            margin-bottom: 40px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .hero-banner::after {
            content: '';
            position: absolute;
            right: -50px;
            bottom: -50px;
            width: 350px;
            height: 350px;
            background: rgba(147, 51, 234, 0.15);
            border-radius: 50%;
            filter: blur(60px);
            pointer-events: none;
        }

        .hero-content {
            max-width: 600px;
            position: relative;
            z-index: 2;
        }

        .hero-tag {
            display: inline-block;
            background: rgba(147, 51, 234, 0.2);
            border: 1px solid rgba(147, 51, 234, 0.4);
            color: #d8b4fe;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
        }

        .hero-content h2 {
            font-size: 42px;
            font-weight: 900;
            line-height: 1.15;
            margin-bottom: 16px;
        }

        .hero-content h2 span {
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-content p {
            color: var(--text-muted);
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .btn-hero {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, var(--neon-cyan), #2563eb);
            color: #070a13;
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: 13px;
            padding: 16px 28px;
            border-radius: 16px;
            border: none;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
            letter-spacing: 0.5px;
        }

        .btn-hero:hover {
            opacity: 0.9;
            transform: scale(1.02);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 36px;
        }

        .stat-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 20px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: rgba(147, 51, 234, 0.1);
            color: var(--neon-purple);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .stat-info h4 {
            font-size: 16px;
            font-weight: 700;
        }

        .stat-info p {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        .filters-panel {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
            justify-content: space-between;
        }

        .platform-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
        }

        .filter-label {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-right: 8px;
        }

        .filter-btn {
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }

        .filter-btn:hover, .filter-btn.active {
            background: var(--neon-purple);
            border-color: var(--neon-purple);
            color: #fff;
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
        }

        .dropdown-filters {
            display: flex;
            gap: 12px;
        }

        .select-custom {
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            padding: 10px 16px;
            border-radius: 12px;
            font-size: 13px;
            outline: none;
            cursor: pointer;
            transition: var(--transition);
        }

        .select-custom:focus {
            border-color: var(--neon-purple);
        }

        .catalog-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .catalog-header h3 {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        #gameCount {
            font-size: 13px;
            color: var(--text-muted);
            font-weight: 500;
        }

        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .game-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: var(--transition);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            position: relative;
        }

        .game-card:hover {
            border-color: rgba(147, 51, 234, 0.5);
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(147, 51, 234, 0.15);
        }

        .game-thumb {
            height: 180px;
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .game-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .game-card:hover .game-thumb img {
            transform: scale(1.08);
        }

        .game-platforms {
            position: absolute;
            top: 12px;
            left: 12px;
            display: flex;
            gap: 4px;
        }

        .platform-tag {
            background: rgba(7, 10, 19, 0.85);
            backdrop-filter: blur(8px);
            border: 1px solid var(--border-color);
            color: var(--neon-cyan);
            font-size: 10px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
        }

        .discount-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: var(--neon-pink);
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 6px;
            box-shadow: 0 4px 10px rgba(236, 72, 153, 0.4);
        }

        .game-info {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .game-meta-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 6px;
        }

        .game-rating {
            color: #f59e0b;
            display: flex;
            align-items: center;
            gap: 4px;
            font-weight: 600;
        }

        .game-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: var(--text-main);
            cursor: pointer;
            transition: var(--transition);
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .game-title:hover {
            color: var(--neon-cyan);
        }

        .game-footer {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(30, 41, 59, 0.6);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .game-price span:first-child {
            display: block;
            font-size: 11px;
            color: var(--text-muted);
            text-decoration: line-through;
        }

        .game-price span:last-child {
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            font-weight: 900;
            color: var(--neon-green);
        }

        .btn-add-cart {
            background: rgba(147, 51, 234, 0.15);
            border: 1px solid rgba(147, 51, 234, 0.3);
            color: var(--neon-purple);
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
        }

        .btn-add-cart:hover {
            background: var(--neon-purple);
            color: #fff;
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.4);
        }

        .load-more-container {
            text-align: center;
            margin-top: 30px;
        }

        .btn-load-more {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            font-size: 13px;
            padding: 16px 36px;
            border-radius: 16px;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-load-more:hover {
            background: var(--bg-card-hover);
            border-color: var(--neon-purple);
        }

        .modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(7, 10, 19, 0.85);
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        .modal-box {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 28px;
            width: 100%;
            max-width: 650px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
            transform: scale(0.95);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .modal-overlay.active .modal-box {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
        }

        .modal-close:hover {
            background: var(--neon-pink);
            color: #fff;
            border-color: var(--neon-pink);
        }

        .cart-sidebar-overlay {
            position: fixed;
            inset: 0;
            z-index: 200;
            background: rgba(7, 10, 19, 0.85);
            backdrop-filter: blur(8px);
            display: flex;
            justify-content: flex-end;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .cart-sidebar-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        .cart-sidebar {
            background: var(--bg-card);
            border-left: 1px solid var(--border-color);
            width: 100%;
            max-width: 440px;
            height: 100%;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-sidebar-overlay.active .cart-sidebar {
            transform: translateX(0);
        }

        .cart-header {
            padding: 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .cart-header h3 {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cart-items-container {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .cart-item {
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 14px;
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .cart-item img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            object-fit: cover;
        }

        .cart-item-info {
            flex: 1;
        }

        .cart-item-info h4 {
            font-size: 13px;
            font-weight: 700;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .cart-item-info span {
            font-size: 11px;
            color: var(--neon-cyan);
        }

        .cart-item-price {
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            font-weight: 800;
            color: var(--neon-green);
            margin-top: 4px;
            display: block;
        }

        .btn-remove-item {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 8px;
            transition: var(--transition);
        }

        .btn-remove-item:hover {
            color: #ef4444;
        }

        .cart-footer {
            padding: 24px;
            border-top: 1px solid var(--border-color);
            background: rgba(7, 10, 19, 0.5);
        }

        .coupon-box {
            display: flex;
            gap: 10px;
            margin-bottom: 16px;
        }

        .coupon-box input {
            flex: 1;
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 10px 14px;
            font-size: 12px;
            color: #fff;
            outline: none;
            text-transform: uppercase;
        }

        .coupon-box button {
            background: var(--bg-card-hover);
            border: 1px solid var(--border-color);
            color: #fff;
            padding: 0 16px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
            font-family: 'Orbitron', sans-serif;
        }

        .cart-summary-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 8px;
        }

        .cart-summary-total {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 800;
            color: #fff;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--border-color);
            font-family: 'Orbitron', sans-serif;
        }

        .cart-summary-total span:last-child {
            color: var(--neon-cyan);
        }

        .btn-checkout {
            width: 100%;
            background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
            border: none;
            padding: 16px;
            border-radius: 16px;
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            margin-top: 20px;
            box-shadow: 0 10px 25px rgba(147, 51, 234, 0.4);
            transition: var(--transition);
        }

        .btn-checkout:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        .view-section {
            display: none;
        }

        .view-section.active {
            display: block;
            animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .account-header-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 28px;
            padding: 32px;
            margin-bottom: 32px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .account-profile-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .account-avatar {
            width: 76px;
            height: 76px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
            padding: 2px;
            box-shadow: 0 0 25px rgba(147, 51, 234, 0.4);
        }

        .account-avatar-inner {
            width: 100%;
            height: 100%;
            background: var(--bg-main);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            font-weight: 900;
            color: #fff;
        }

        .account-stats-row {
            display: flex;
            gap: 16px;
        }

        .account-stat-box {
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            padding: 14px 22px;
            border-radius: 16px;
            text-align: center;
        }

        .account-stat-box span:first-child {
            display: block;
            font-size: 10px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }

        .account-stat-box span:last-child {
            font-family: 'Orbitron', sans-serif;
            font-size: 20px;
            font-weight: 900;
            color: var(--neon-cyan);
        }

        .account-tabs {
            display: flex;
            border-bottom: 1px solid var(--border-color);
            gap: 32px;
            margin-bottom: 32px;
        }

        .account-tab-btn {
            background: none;
            border: none;
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: var(--text-muted);
            padding-bottom: 16px;
            cursor: pointer;
            position: relative;
            transition: var(--transition);
        }

        .account-tab-btn.active {
            color: var(--neon-purple);
        }

        .account-tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--neon-purple);
            box-shadow: 0 0 10px var(--neon-purple);
        }

        .library-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
        }

        .library-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 22px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .library-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 120px;
            height: 120px;
            background: rgba(147, 51, 234, 0.08);
            border-radius: 50%;
            filter: blur(20px);
            pointer-events: none;
        }

        .library-card-top {
            display: flex;
            gap: 16px;
            margin-bottom: 18px;
        }

        .library-card-top img {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            object-fit: cover;
            border: 1px solid var(--border-color);
        }

        .library-key-box {
            background: var(--bg-main);
            border: 1px solid var(--border-color);
            padding: 12px 14px;
            border-radius: 14px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .library-key-box span {
            font-family: monospace;
            font-size: 12px;
            font-weight: 700;
            color: var(--neon-cyan);
        }

        .btn-copy-key {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }

        .btn-copy-key:hover {
            color: #fff;
            border-color: var(--neon-purple);
        }

        .btn-download-game {
            width: 100%;
            background: var(--neon-purple);
            border: none;
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            font-size: 12px;
            padding: 12px;
            border-radius: 12px;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
        }

        .btn-download-game:hover {
            opacity: 0.9;
        }

        footer {
            background: var(--bg-card);
            border-top: 1px solid var(--border-color);
            padding: 60px 24px 30px;
            margin-top: 60px;
        }

        .footer-container {
            max-width: 1300px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-col h4 {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
            color: #fff;
        }

        .footer-col ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .footer-col ul li a {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 13px;
            transition: var(--transition);
        }

        .footer-col ul li a:hover {
            color: var(--neon-cyan);
        }

        .footer-bottom {
            max-width: 1300px;
            margin: 0 auto;
            padding-top: 30px;
            border-top: 1px solid var(--border-color);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            font-size: 12px;
            color: var(--text-muted);
        }

        @media (max-width: 768px) {
            .search-container {
                display: none;
            }
            .hero-banner {
                padding: 32px 20px;
            }
            .hero-content h2 {
                font-size: 30px;
            }
            .account-header-card {
                flex-direction: column;
                align-items: flex-start;
            }
            .account-stats-row {
                width: 100%;
                justify-content: space-between;
            }
        }
    </style>
</head>
<body>

    <header>
        <div class="nav-container">
            <div class="logo-box" onclick="switchView('store')">
                <div class="logo-icon">
                    <i class="fa-solid fa-gamepad text-white text-xl"></i>
                </div>
                <div class="logo-text">
                    <h1>PIXELVAULT</h1>
                    <span>Mídia Digital 24/7</span>
                </div>
            </div>

            <div class="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="searchInput" oninput="handleSearch()" placeholder="Buscar entre mais de 200 jogos digitais...">
            </div>

            <div class="nav-actions">
                <button class="btn-action" onclick="toggleCartModal()">
                    <i class="fa-solid fa-cart-shopping text-cyan-400"></i>
                    <span class="hidden sm:inline">Carrinho</span>
                    <span id="cartBadge" class="badge-count">0</span>
                </button>
                <button class="btn-action btn-primary-gradient" onclick="switchView('account')">
                    <i class="fa-solid fa-user-shield"></i>
                    <span class="font-gamer font-bold tracking-wide">Minha Conta</span>
                </button>
            </div>
        </div>
    </header>

    <div id="toastBox" class="toast-box">
        <div id="toastIcon" class="toast-icon">
            <i class="fa-solid fa-check"></i>
        </div>
        <div class="toast-content">
            <h4 id="toastTitle">Notificação</h4>
            <p id="toastMessage">Ação realizada com sucesso.</p>
        </div>
    </div>

    <main>
        <div id="storeView" class="view-section active">
            
            <div class="hero-banner">
                <div class="hero-content">
                    <span class="hero-tag">⚡ Mídia Digital Original Instantânea</span>
                    <h2>JOGOS AAA COM <br><span>ATÉ 80% DE DESCONTO</span></h2>
                    <p>Catálogo completo com mais de 200 títulos para PC (Steam/Epic), PlayStation 4/5, Xbox Series X/S e Nintendo Switch. Chave de ativação imediata e garantia vitalícia.</p>
                    <button class="btn-hero" onclick="scrollToCatalog()">
                        <i class="fa-solid fa-gamepad"></i> EXPLORAR CATÁLOGO (200+ OPÇÕES)
                    </button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="stat-info">
                        <h4>100% Garantido</h4>
                        <p>Contas e chaves seguras</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--neon-cyan); background: rgba(6, 182, 212, 0.1);"><i class="fa-solid fa-bolt"></i></div>
                    <div class="stat-info">
                        <h4>Envio Imediato</h4>
                        <p>Chave liberada na hora</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--neon-pink); background: rgba(236, 72, 153, 0.1);"><i class="fa-solid fa-headset"></i></div>
                    <div class="stat-info">
                        <h4>Suporte 24/7</h4>
                        <p>Atendimento especializado</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="color: var(--neon-green); background: rgba(16, 185, 129, 0.1);"><i class="fa-solid fa-star"></i></div>
                    <div class="stat-info">
                        <h4>4.9 / 5.0</h4>
                        <p>+25 mil clientes satisfeitos</p>
                    </div>
                </div>
            </div>

            <div id="catalogAnchor"></div>

            <div class="filters-panel">
                <div class="platform-filters">
                    <span class="filter-label">Plataforma:</span>
                    <button class="filter-btn active" onclick="filterPlatform('all')" id="btn-plat-all">Todos</button>
                    <button class="filter-btn" onclick="filterPlatform('PC')" id="btn-plat-PC">PC</button>
                    <button class="filter-btn" onclick="filterPlatform('PlayStation')" id="btn-plat-PlayStation">PlayStation</button>
                    <button class="filter-btn" onclick="filterPlatform('Xbox')" id="btn-plat-Xbox">Xbox</button>
                    <button class="filter-btn" onclick="filterPlatform('Nintendo')" id="btn-plat-Nintendo">Nintendo</button>
                </div>

                <div class="dropdown-filters">
                    <select class="select-custom" id="genreSelect" onchange="filterGenre(this.value)">
                        <option value="all">Todos os Gêneros</option>
                        <option value="Ação">Ação</option>
                        <option value="RPG">RPG</option>
                        <option value="FPS">FPS / Tiro</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Corrida">Corrida</option>
                        <option value="Terror">Terror</option>
                        <option value="Estratégia">Estratégia</option>
                    </select>

                    <select class="select-custom" id="sortSelect" onchange="sortCatalog(this.value)">
                        <option value="popular">Mais Populares</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                        <option value="name">Nome (A-Z)</option>
                    </select>
                </div>
            </div>

            <div class="catalog-header">
                <h3>Catálogo de Jogos Digitais</h3>
                <span id="gameCount">Mostrando 200+ jogos</span>
            </div>

            <div id="gamesGrid" class="games-grid">
                <!-- Dynamically populated by JS -->
            </div>

            <div class="load-more-container" id="paginationContainer">
                <button class="btn-load-more" onclick="loadMoreGames()" id="loadMoreBtn">CARREGAR MAIS JOGOS</button>
            </div>

        </div>

        <div id="accountView" class="view-section">
            <div class="account-header-card">
                <div class="account-profile-info">
                    <div class="account-avatar">
                        <div class="account-avatar-inner">PV</div>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                            <h2 class="font-gamer text-xl font-bold">GamerMaster_99</h2>
                            <span style="background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.4); color: var(--neon-cyan); font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 999px;">VIP ELITE</span>
                        </div>
                        <p class="text-xs text-muted">gamer.master99@pixelvault.com</p>
                        <p class="text-xs text-muted" style="margin-top: 4px;"><i class="fa-regular fa-calendar text-purple-400"></i> Membro desde: Janeiro de 2026</p>
                    </div>
                </div>

                <div class="account-stats-row">
                    <div class="account-stat-box">
                        <span>Jogos na Biblioteca</span>
                        <span id="libraryCount">0</span>
                    </div>
                    <div class="account-stat-box">
                        <span>Cashback Pix</span>
                        <span style="color: var(--neon-green);">R$ 150,00</span>
                    </div>
                </div>
            </div>

            <div class="account-tabs">
                <button class="account-tab-btn active" onclick="switchAccountTab('library')" id="tabLibraryBtn">
                    <i class="fa-solid fa-gamepad mr-2"></i> Minha Biblioteca Digital & Keys
                </button>
                <button class="account-tab-btn" onclick="switchAccountTab('orders')" id="tabOrdersBtn">
                    <i class="fa-solid fa-receipt mr-2"></i> Histórico de Pedidos
                </button>
            </div>

            <div id="tabLibraryContent">
                <div style="margin-bottom: 24px;">
                    <h3 class="font-gamer text-lg font-bold">Chaves de Ativação e Downloads Liberados</h3>
                </div>
                <div id="libraryGrid" class="library-grid">
                    <!-- Populated by JS -->
                </div>
            </div>

            <div id="tabOrdersContent" style="display: none;">
                <div style="margin-bottom: 24px;">
                    <h3 class="font-gamer text-lg font-bold">Faturas e Compras Realizadas</h3>
                </div>
                <div id="ordersList" style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Populated by JS -->
                </div>
            </div>
        </div>
    </main>

    <div id="gameModal" class="modal-overlay" onclick="handleModalBackdropClick(event, 'gameModal')">
        <div class="modal-box">
            <button class="modal-close" onclick="closeModal('gameModal')">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div id="modalGameContent">
                <!-- Populated by JS -->
            </div>
        </div>
    </div>

    <div id="cartSidebarOverlay" class="cart-sidebar-overlay" onclick="handleModalBackdropClick(event, 'cartSidebarOverlay')">
        <div class="cart-sidebar">
            <div class="cart-header">
                <h3><i class="fa-solid fa-cart-shopping text-cyan-400"></i> Carrinho de Compras</h3>
                <button class="modal-close" style="position: static;" onclick="toggleCartModal()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div id="cartItemsList" class="cart-items-container">
                <!-- Populated by JS -->
            </div>

            <div class="cart-footer">
                <div class="coupon-box">
                    <input type="text" id="couponInput" placeholder="Cupom (ex: PIXEL10)">
                    <button onclick="applyCoupon()">APLICAR</button>
                </div>
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span id="cartSubtotal">R$ 0,00</span>
                </div>
                <div id="discountRow" class="cart-summary-row" style="color: var(--neon-green); display: none;">
                    <span id="discountLabel">Desconto (Cupom)</span>
                    <span id="cartDiscountAmount">- R$ 0,00</span>
                </div>
                <div class="cart-summary-total">
                    <span>Total a Pagar</span>
                    <span id="cartTotal">R$ 0,00</span>
                </div>
                <button class="btn-checkout" onclick="openCheckout()">FINALIZAR COMPRA SEGURA</button>
            </div>
        </div>
    </div>

    <div id="checkoutModal" class="modal-overlay" onclick="handleModalBackdropClick(event, 'checkoutModal')">
        <div class="modal-box" style="padding: 32px;">
            <button class="modal-close" onclick="closeModal('checkoutModal')">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <h3 class="font-gamer text-xl font-bold mb-6">Gateway de Pagamento PixelVault</h3>
            
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Selecione a Forma de Pagamento:</label>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <label style="background: var(--bg-main); border: 2px solid var(--neon-purple); padding: 16px; border-radius: 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onclick="selectPaymentMethod('pix')">
                            <input type="radio" name="payment" checked style="accent-color: var(--neon-purple);">
                            <div>
                                <span style="display: block; font-weight: 700; font-size: 13px;"><i class="fa-solid fa-qrcode text-cyan-400 mr-1"></i> PIX</span>
                                <span style="font-size: 10px; color: var(--neon-green);">Aprovação imediata + 5% off</span>
                            </div>
                        </label>
                        <label style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 16px; border-radius: 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;" onclick="selectPaymentMethod('credit')">
                            <input type="radio" name="payment" style="accent-color: var(--neon-purple);">
                            <div>
                                <span style="display: block; font-weight: 700; font-size: 13px;"><i class="fa-solid fa-credit-card text-purple-400 mr-1"></i> Cartão</span>
                                <span style="font-size: 10px; color: var(--text-muted);">Até 12x sem juros</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div id="pixDetailsBox" style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 20px; border-radius: 16px; text-align: center;">
                    <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">Escaneie o QR Code abaixo com o app do seu banco:</p>
                    <div style="width: 130px; height: 130px; background: #fff; margin: 0 auto 14px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-qrcode text-6xl text-slate-900"></i>
                    </div>
                    <span style="font-family: monospace; font-size: 11px; color: var(--neon-cyan); background: var(--bg-card); padding: 8px 12px; border-radius: 8px; display: inline-block;">00020126580014br.gov.bcb.pix0136pixelvault-games-digital-key-883921</span>
                </div>

                <div id="cardDetailsBox" style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 20px; border-radius: 16px; display: none; flex-direction: column; gap: 14px;">
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Número do Cartão</label>
                        <input type="text" placeholder="4532 •••• •••• 9921" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 14px; border-radius: 10px; color: #fff; font-size: 13px; outline: none;">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <div>
                            <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Validade</label>
                            <input type="text" placeholder="MM/AA" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 14px; border-radius: 10px; color: #fff; font-size: 13px; outline: none;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">CVV</label>
                            <input type="password" placeholder="•••" style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 14px; border-radius: 10px; color: #fff; font-size: 13px; outline: none;">
                        </div>
                    </div>
                </div>

                <button class="btn-checkout" onclick="finalizePurchase()" style="margin-top: 0; background: linear-gradient(135deg, var(--neon-green), #059669);">
                    <i class="fa-solid fa-lock mr-2"></i> CONFIRMAR PAGAMENTO E LIBERAR CHAVES
                </button>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <div class="logo-box" style="margin-bottom: 16px;">
                    <div class="logo-icon" style="width: 36px; height: 36px; border-radius: 10px;">
                        <i class="fa-solid fa-gamepad text-white text-sm"></i>
                    </div>
                    <div class="logo-text">
                        <h1 style="font-size: 18px;">PIXELVAULT</h1>
                    </div>
                </div>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.6;">Sua loja definitiva de jogos digitais para PC e consoles. Chaves originais com entrega automatizada em segundos e suporte 24/7.</p>
            </div>
            <div class="footer-col">
                <h4>Plataformas</h4>
                <ul>
                    <li><a href="#" onclick="filterPlatform('PC')">PC (Steam & Epic Games)</a></li>
                    <li><a href="#" onclick="filterPlatform('PlayStation')">PlayStation 4 & 5</a></li>
                    <li><a href="#" onclick="filterPlatform('Xbox')">Xbox One & Series X/S</a></li>
                    <li><a href="#" onclick="filterPlatform('Nintendo')">Nintendo Switch</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Suporte & Ajuda</h4>
                <ul>
                    <li><a href="#">Como Resgatar a Key</a></li>
                    <li><a href="#">Garantia PixelVault</a></li>
                    <li><a href="#">Termos & Condições</a></li>
                    <li><a href="#">Central de Atendimento</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Segurança & Pagamento</h4>
                <div style="display: flex; gap: 12px; font-size: 22px; color: var(--text-muted); margin-bottom: 14px;">
                    <i class="fa-brands fa-pix" title="PIX"></i>
                    <i class="fa-brands fa-cc-visa" title="Visa"></i>
                    <i class="fa-brands fa-cc-mastercard" title="Mastercard"></i>
                    <i class="fa-brands fa-paypal" title="PayPal"></i>
                </div>
                <p style="font-size: 11px; color: var(--text-muted);">Criptografia SSL de 256-bit em todas as transações.</p>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; 2026 PixelVault Games Mídia Digital Ltda. Todos os direitos reservados.</span>
            <span>Desenvolvido com JavaScript Puro & CSS Avançado</span>
        </div>
    </footer>

    <script>
        // Data sets for dynamic generation of 200+ games
        const baseFranchises = [
            { name: "Cyberpunk 2077", genre: "RPG", basePrice: 99.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
            { name: "Elden Ring", genre: "RPG", basePrice: 199.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80" },
            { name: "Grand Theft Auto V", genre: "Ação", basePrice: 49.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80" },
            { name: "Red Dead Redemption 2", genre: "Aventura", basePrice: 89.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" },
            { name: "EA Sports FC 25", genre: "Esportes", basePrice: 249.90, plat: ["PC", "PlayStation", "Xbox", "Nintendo"], img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
            { name: "Call of Duty: Modern Warfare III", genre: "FPS", basePrice: 199.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&q=80" },
            { name: "God of War Ragnarök", genre: "Ação", basePrice: 179.90, plat: ["PlayStation", "PC"], img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" },
            { name: "The Legend of Zelda: Tears of the Kingdom", genre: "Aventura", basePrice: 229.90, plat: ["Nintendo"], img: "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?auto=format&fit=crop&w=600&q=80" },
            { name: "Hogwarts Legacy", genre: "RPG", basePrice: 129.90, plat: ["PC", "PlayStation", "Xbox", "Nintendo"], img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" },
            { name: "Baldur's Gate 3", genre: "RPG", basePrice: 199.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=600&q=80" },
            { name: "Resident Evil 4 Remake", genre: "Terror", basePrice: 109.90, plat: ["PC", "PlayStation", "Xbox"], img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80" },
            { name: "Forza Horizon 5", genre: "Corrida", basePrice: 99.90, plat: ["PC", "Xbox"], img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80" }
        ];

        const adjectives = ["Ultimate", "Deluxe", "Remastered", "Director's Cut", "Next-Gen", "Anniversary", "Special Edition", "GOTY", "Legendary", "Enhanced"];
        const nouns = ["Chronicles", "Legacy", "Protocol", "Saga", "Revolution", "Odyssey", "Origins", "Tactics", "Zero", "Prime", "Awakening", "Rebirth"];
        const genresList = ["Ação", "RPG", "FPS", "Aventura", "Esportes", "Corrida", "Terror", "Estratégia"];
        const platformsList = [["PC"], ["PlayStation"], ["Xbox"], ["Nintendo"], ["PC", "PlayStation", "Xbox"], ["PC", "Nintendo"], ["PlayStation", "Xbox"]];
        const imagesList = [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=600&q=80"
        ];

        let allGames = [];
        let displayedCount = 24;
        let currentPlatformFilter = 'all';
        let currentGenreFilter = 'all';
        let currentSort = 'popular';
        let searchQuery = '';
        let appliedDiscount = 0;

        let cart = [];
        let userLibrary = [
            { id: 999, title: "Cyberpunk 2077 (Bônus de Boas-Vindas)", platform: "PC", key: "CP77-PV99X-88231-ALPHA", date: "15/01/2026", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" }
        ];
        let userOrders = [
            { id: "ORD-89421", date: "15/01/2026", total: "R$ 99,90", payment: "PIX", status: "Aprovado", items: ["Cyberpunk 2077"] }
        ];

        // Initialize Catalog generator for 200+ games
        function generateCatalog() {
            baseFranchises.forEach((f, idx) => {
                allGames.push({
                    id: idx + 1,
                    title: f.name,
                    genre: f.genre,
                    price: f.basePrice,
                    originalPrice: +(f.basePrice * 1.6).toFixed(2),
                    platforms: f.plat,
                    image: f.img,
                    rating: (4.6 + Math.random() * 0.35).toFixed(1),
                    sales: Math.floor(1000 + Math.random() * 9000),
                    description: `Mídia digital oficial e original para ${f.plat.join(', ')}. Receba os dados de acesso ou chave de ativação imediatamente após a confirmação do pagamento. Garantia vitalícia e suporte dedicado.`
                });
            });

            for (let i = baseFranchises.length + 1; i <= 210; i++) {
                const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
                const noun = nouns[Math.floor(Math.random() * nouns.length)];
                const title = `Cyber ${noun} ${i}: ${adj}`;
                const genre = genresList[Math.floor(Math.random() * genresList.length)];
                const price = +(39.90 + Math.random() * 180).toFixed(2);
                const originalPrice = +(price * 1.5).toFixed(2);
                const plat = platformsList[Math.floor(Math.random() * platformsList.length)];
                const img = imagesList[Math.floor(Math.random() * imagesList.length)];

                allGames.push({
                    id: i,
                    title: title,
                    genre: genre,
                    price: price,
                    originalPrice: originalPrice,
                    platforms: plat,
                    image: img,
                    rating: (4.0 + Math.random() * 0.9).toFixed(1),
                    sales: Math.floor(100 + Math.random() * 5000),
                    description: `Chave de ativação digital e original de ${title}. Plataformas compatíveis: ${plat.join(', ')}. Download direto e seguro com suporte 24h.`
                });
            }
        }

        window.onload = function() {
            generateCatalog();
            renderCatalog();
            updateCartUI();
            renderLibrary();
            renderOrders();
        }

        // Filtering and sorting logic
        function getFilteredGames() {
            return allGames.filter(game => {
                const matchPlatform = currentPlatformFilter === 'all' || game.platforms.includes(currentPlatformFilter);
                const matchGenre = currentGenreFilter === 'all' || game.genre === currentGenreFilter;
                const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || game.genre.toLowerCase().includes(searchQuery.toLowerCase());
                return matchPlatform && matchGenre && matchSearch;
            }).sort((a, b) => {
                if (currentSort === 'popular') return b.sales - a.sales;
                if (currentSort === 'price-asc') return a.price - b.price;
                if (currentSort === 'price-desc') return b.price - a.price;
                if (currentSort === 'name') return a.title.localeCompare(b.title);
            });
        }

        function renderCatalog() {
            const filtered = getFilteredGames();
            const grid = document.getElementById('gamesGrid');
            const countLabel = document.getElementById('gameCount');
            const loadMoreBtn = document.getElementById('paginationContainer');

            countLabel.innerText = `Mostrando ${Math.min(displayedCount, filtered.length)} de ${filtered.length} jogos`;

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 60px 0; text-align: center; color: var(--text-muted);">
                        <i class="fa-solid fa-gamepad text-5xl mb-3"></i>
                        <h3 class="font-gamer text-lg font-bold">Nenhum jogo encontrado</h3>
                        <p class="text-xs mt-1">Tente buscar por outro termo ou alterar os filtros.</p>
                    </div>
                `;
                loadMoreBtn.style.display = 'none';
                return;
            }

            const chunk = filtered.slice(0, displayedCount);

            grid.innerHTML = chunk.map(game => {
                const discount = Math.round((1 - game.price / game.originalPrice) * 100);
                return `
                    <div class="game-card">
                        <div class="game-thumb" onclick="openGameModal(${game.id})">
                            <img src="${game.image}" alt="${game.title}" onerror="this.src='https://placehold.co/600x400/0f172a/9333ea?text=PixelVault'">
                            <div class="game-platforms">
                                ${game.platforms.map(p => `<span class="platform-tag">${p}</span>`).join('')}
                            </div>
                            <span class="discount-badge">-${discount}%</span>
                        </div>
                        <div class="game-info">
                            <div>
                                <div class="game-meta-top">
                                    <span>${game.genre}</span>
                                    <div class="game-rating">
                                        <i class="fa-solid fa-star text-xs"></i> ${game.rating}
                                    </div>
                                </div>
                                <h4 class="game-title" onclick="openGameModal(${game.id})">${game.title}</h4>
                            </div>
                            <div class="game-footer">
                                <div class="game-price">
                                    <span>R$ ${game.originalPrice.toFixed(2)}</span>
                                    <span>R$ ${game.price.toFixed(2)}</span>
                                </div>
                                <button class="btn-add-cart" onclick="addToCart(${game.id})">
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            if (displayedCount >= filtered.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        function loadMoreGames() {
            displayedCount += 24;
            renderCatalog();
        }

        function filterPlatform(plat) {
            currentPlatformFilter = plat;
            displayedCount = 24;
            ['all', 'PC', 'PlayStation', 'Xbox', 'Nintendo'].forEach(p => {
                const btn = document.getElementById(`btn-plat-${p}`);
                if (btn) {
                    if (p === plat) btn.classList.add('active');
                    else btn.classList.remove('active');
                }
            });
            renderCatalog();
        }

        function filterGenre(genre) {
            currentGenreFilter = genre;
            displayedCount = 24;
            renderCatalog();
        }

        function sortCatalog(sortVal) {
            currentSort = sortVal;
            renderCatalog();
        }

        function handleSearch() {
            searchQuery = document.getElementById('searchInput').value;
            displayedCount = 24;
            renderCatalog();
        }

        function scrollToCatalog() {
            document.getElementById('catalogAnchor').scrollIntoView({ behavior: 'smooth' });
        }

        // View toggles
        function switchView(viewName) {
            const storeView = document.getElementById('storeView');
            const accountView = document.getElementById('accountView');

            if (viewName === 'store') {
                storeView.classList.add('active');
                accountView.classList.remove('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (viewName === 'account') {
                accountView.classList.add('active');
                storeView.classList.remove('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function switchAccountTab(tab) {
            const libBtn = document.getElementById('tabLibraryBtn');
            const ordBtn = document.getElementById('tabOrdersBtn');
            const libContent = document.getElementById('tabLibraryContent');
            const ordContent = document.getElementById('tabOrdersContent');

            if (tab === 'library') {
                libBtn.classList.add('active');
                ordBtn.classList.remove('active');
                libContent.style.display = 'block';
                ordContent.style.display = 'none';
            } else {
                ordBtn.classList.add('active');
                libBtn.classList.remove('active');
                ordContent.style.display = 'block';
                libContent.style.display = 'none';
            }
        }

        // Modal Controls
        function openGameModal(id) {
            const game = allGames.find(g => g.id === id);
            if (!game) return;

            const modalContent = document.getElementById('modalGameContent');
            const discount = Math.round((1 - game.price / game.originalPrice) * 100);

            modalContent.innerHTML = `
                <div style="height: 260px; position: relative;">
                    <img src="${game.image}" alt="${game.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; inset: 0; background: linear-gradient(to top, var(--bg-card), transparent);"></div>
                </div>
                <div style="padding: 24px; margin-top: -40px; position: relative; z-index: 2;">
                    <span style="background: var(--neon-purple); color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">${game.genre}</span>
                    <h2 class="font-gamer text-2xl font-bold mt-2 mb-3">${game.title}</h2>
                    
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <div>
                            <span style="font-size: 11px; color: var(--text-muted); display: block; text-transform: uppercase;">Plataformas Suportadas</span>
                            <div style="display: flex; gap: 6px; margin-top: 6px;">
                                ${game.platforms.map(p => `<span class="platform-tag">${p}</span>`).join('')}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-size: 12px; color: var(--text-muted); text-decoration: line-through;">R$ ${game.originalPrice.toFixed(2)}</span>
                            <div class="font-gamer text-2xl font-black" style="color: var(--neon-green);">R$ ${game.price.toFixed(2)} <span style="font-size: 11px; background: var(--neon-pink); color: #fff; padding: 2px 6px; border-radius: 4px;">-${discount}%</span></div>
                        </div>
                    </div>

                    <h4 class="font-gamer text-sm font-bold uppercase mb-2">Sobre a Mídia Digital</h4>
                    <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">${game.description}</p>

                    <button class="btn-checkout" onclick="addToCart(${game.id}); closeModal('gameModal');" style="margin-top: 0;">
                        <i class="fa-solid fa-cart-plus mr-2"></i> ADICIONAR AO CARRINHO
                    </button>
                </div>
            `;
            document.getElementById('gameModal').classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        function handleModalBackdropClick(event, modalId) {
            if (event.target.id === modalId) {
                closeModal(modalId);
            }
        }

        function toggleCartModal() {
            const overlay = document.getElementById('cartSidebarOverlay');
            overlay.classList.toggle('active');
            renderCartItems();
        }

        // Cart and Checkout logic
        function addToCart(id) {
            const game = allGames.find(g => g.id === id);
            if (!game) return;

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...game, quantity: 1 });
            }

            updateCartUI();
            showToast("Item Adicionado!", `${game.title} foi adicionado ao carrinho.`, "fa-cart-shopping");
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
            renderCartItems();
        }

        function updateCartUI() {
            const badge = document.getElementById('cartBadge');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.innerText = totalItems;
        }

        function applyCoupon() {
            const code = document.getElementById('couponInput').value.trim().toUpperCase();
            if (code === 'PIXEL10' || code === 'VAULT10') {
                appliedDiscount = 0.10;
                showToast("Cupom Aplicado!", "10% de desconto adicionado ao pedido.", "fa-tag");
            } else if (code === 'PIXEL20') {
                appliedDiscount = 0.20;
                showToast("Cupom Aplicado!", "20% de desconto adicionado ao pedido.", "fa-tag");
            } else {
                appliedDiscount = 0;
                showToast("Cupom Inválido", "Código não reconhecido.", "fa-triangle-exclamation");
            }
            renderCartItems();
        }

        function renderCartItems() {
            const list = document.getElementById('cartItemsList');
            const subtotalEl = document.getElementById('cartSubtotal');
            const totalEl = document.getElementById('cartTotal');
            const discountRow = document.getElementById('discountRow');
            const discountAmountEl = document.getElementById('cartDiscountAmount');

            if (cart.length === 0) {
                list.innerHTML = `
                    <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
                        <i class="fa-solid fa-cart-shopping text-4xl mb-3"></i>
                        <p class="font-gamer text-sm">Seu carrinho está vazio</p>
                    </div>
                `;
                subtotalEl.innerText = "R$ 0,00";
                totalEl.innerText = "R$ 0,00";
                discountRow.style.display = 'none';
                return;
            }

            let subtotal = 0;
            list.innerHTML = cart.map(item => {
                subtotal += item.price * item.quantity;
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/100x100/0f172a/9333ea?text=PV'">
                        <div class="cart-item-info">
                            <h4>${item.title}</h4>
                            <span>${item.platforms[0]}</span>
                            <span class="cart-item-price">R$ ${item.price.toFixed(2)}</span>
                        </div>
                        <button class="btn-remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');

            const discountVal = subtotal * appliedDiscount;
            const finalTotal = subtotal - discountVal;

            subtotalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
            if (appliedDiscount > 0) {
                discountRow.style.display = 'flex';
                discountAmountEl.innerText = `- R$ ${discountVal.toFixed(2)}`;
            } else {
                discountRow.style.display = 'none';
            }
            totalEl.innerText = `R$ ${finalTotal.toFixed(2)}`;
        }

        function openCheckout() {
            if (cart.length === 0) {
                showToast("Carrinho Vazio", "Adicione pelo menos um jogo para prosseguir.", "fa-triangle-exclamation");
                return;
            }
            toggleCartModal();
            document.getElementById('checkoutModal').classList.add('active');
        }

        function selectPaymentMethod(method) {
            const pixBox = document.getElementById('pixDetailsBox');
            const cardBox = document.getElementById('cardDetailsBox');

            if (method === 'pix') {
                pixBox.style.display = 'block';
                cardBox.style.display = 'none';
            } else {
                pixBox.style.display = 'none';
                cardBox.style.display = 'flex';
            }
        }

        function finalizePurchase() {
            cart.forEach(item => {
                userLibrary.push({
                    id: item.id,
                    title: item.title,
                    platform: item.platforms[0],
                    key: `PV-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                    date: new Date().toLocaleDateString(),
                    image: item.image
                });
            });

            const rawTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const finalOrderTotal = rawTotal * (1 - appliedDiscount);

            userOrders.unshift({
                id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
                date: new Date().toLocaleDateString(),
                total: `R$ ${finalOrderTotal.toFixed(2)}`,
                payment: "PIX / Aprovado",
                status: "Concluído",
                items: cart.map(i => i.title)
            });

            cart = [];
            appliedDiscount = 0;
            updateCartUI();
            closeModal('checkoutModal');

            renderLibrary();
            renderOrders();

            showToast("Compra Aprovada!", "Chaves liberadas na sua Biblioteca Digital!", "fa-circle-check");
            switchView('account');
        }

        // Library and Orders rendering
        function renderLibrary() {
            const grid = document.getElementById('libraryGrid');
            const countEl = document.getElementById('libraryCount');
            countEl.innerText = userLibrary.length;

            grid.innerHTML = userLibrary.map(item => `
                <div class="library-card">
                    <div>
                        <div class="library-card-top">
                            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/100x100/0f172a/9333ea?text=PV'">
                            <div>
                                <span class="platform-tag">${item.platform}</span>
                                <h4 class="font-gamer text-sm font-bold mt-1" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${item.title}</h4>
                                <span style="font-size: 11px; color: var(--text-muted);">Adquirido em: ${item.date}</span>
                            </div>
                        </div>
                        <div class="library-key-box">
                            <span id="key-${item.id}">${item.key}</span>
                            <button class="btn-copy-key" onclick="copyKey('${item.key}')">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                    </div>
                    <button class="btn-download-game" onclick="showToast('Download Iniciado', 'O instalador seguro foi acionado.', 'fa-download')">
                        <i class="fa-solid fa-download mr-2"></i> BAIXAR / INSTALAR
                    </button>
                </div>
            `).join('');
        }

        function renderOrders() {
            const list = document.getElementById('ordersList');
            list.innerHTML = userOrders.map(ord => `
                <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 20px; border-radius: 16px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                            <span class="font-gamer font-bold text-sm">${ord.id}</span>
                            <span style="background: rgba(16, 185, 129, 0.2); color: var(--neon-green); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px;">${ord.status}</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-muted);">Itens: ${ord.items.join(', ')}</p>
                        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;"><i class="fa-regular fa-calendar text-purple-400 mr-1"></i> ${ord.date} • Pagamento: ${ord.payment}</p>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 11px; color: var(--text-muted); display: block;">Total Pago</span>
                        <span class="font-gamer text-lg font-black" style="color: var(--neon-green);">${ord.total}</span>
                    </div>
                </div>
            `).join('');
        }

        function copyKey(keyText) {
            const textarea = document.createElement('textarea');
            textarea.value = keyText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast("Chave Copiada!", "Chave copiada para a área de transferência.", "fa-copy");
        }

        // Toast notifications
        function showToast(title, msg, iconClass) {
            const toast = document.getElementById('toastBox');
            const titleEl = document.getElementById('toastTitle');
            const msgEl = document.getElementById('toastMessage');
            const iconEl = document.getElementById('toastIcon');

            titleEl.innerText = title;
            msgEl.innerText = msg;
            iconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }
    </script>
</body>
</html>