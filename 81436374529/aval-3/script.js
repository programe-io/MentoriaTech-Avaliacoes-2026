
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Instagram</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">

<header class="bg-white border-b p-4">
<div class="max-w-5xl mx-auto flex justify-between items-center">
<h1 class="text-3xl font-bold">Instagram</h1>
<input type="text" placeholder="Pesquisar" class="bg-gray-100 p-2 rounded-lg hidden sm:block">
<nav class="flex gap-4 text-xl">
<span>🏠</span><span>✉️</span><span>➕</span><span>🔍</span><span>👤</span>
</nav>
</div>
</header>

<main class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-4">

<section class="md:col-span-2">

<!-- Stories -->
<div class="bg-white border rounded-xl p-4 mb-5">
<div class="flex gap-5 overflow-x-auto">

<div class="text-center">
<div class="w-16 h-16 rounded-full bg-pink-400 border-4 border-purple-500 flex items-center justify-center text-white">A</div>
<p class="text-xs mt-2">Seu story</p>
</div>

<div class="text-center">
<div class="w-16 h-16 rounded-full bg-purple-500 border-4 border-pink-500 flex items-center justify-center text-white">M</div>
<p class="text-xs mt-2">mariana</p>
</div>

<div class="text-center">
<div class="w-16 h-16 rounded-full bg-blue-500 border-4 border-pink-500 flex items-center justify-center text-white">J</div>
<p class="text-xs mt-2">joao</p>
</div>

<div class="text-center">
<div class="w-16 h-16 rounded-full bg-green-500 border-4 border-pink-500 flex items-center justify-center text-white">L</div>
<p class="text-xs mt-2">leticia</p>
</div>

<div class="text-center">
<div class="w-16 h-16 rounded-full bg-yellow-500 border-4 border-pink-500 flex items-center justify-center text-white">B</div>
<p class="text-xs mt-2">bruno</p>
</div>

</div>
</div>

<!-- Postagem -->
<div class="bg-white border rounded-xl mb-5">

<div class="flex items-center justify-between p-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">M</div>
<div>
<p class="font-semibold">maria_santos</p>
<p class="text-xs text-gray-500">Teresina, Piauí</p>
</div>
</div>
<span>•••</span>
</div>

<div class="h-80 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center">
<h2 class="text-white text-4xl font-serif italic">Viva o agora ✨</h2>
</div>

<div class="p-4">
<div class="flex gap-4 text-2xl mb-3">
<span>♡</span>
<span>💬</span>
<span>➤</span>
<span class="ml-auto">♧</span>
</div>

<p class="font-semibold text-sm">1.248 curtidas</p>
<p class="text-sm mt-2"><strong>maria_santos</strong> Aproveitando cada momento! ❤️</p>
<p class="text-gray-400 text-xs mt-2">Ver todos os comentários</p>
</div>

</div>
</section>

<!-- Sugestões de usuários -->
<aside class="hidden md:block">

<div class="flex items-center gap-3 mb-6">
<div class="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">A</div>
<div>
<p class="font-semibold text-sm">seu_usuario</p>
<p class="text-gray-500 text-xs">Seu nome</p>
</div>
</div>

<div class="flex justify-between mb-5">
<p class="text-sm font-semibold text-gray-500">Sugestões para você</p>
<button class="text-xs font-semibold">Ver tudo</button>
</div>

<div class="space-y-5">

<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white">L</div>
<p class="text-sm font-semibold">luiza_m</p>
</div>
<button class="text-blue-500 text-xs font-bold">Seguir</button>
</div>

<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">P</div>
<p class="text-sm font-semibold">pedro</p>
</div>
<button class="text-blue-500 text-xs font-bold">Seguir</button>
</div>

<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white">G</div>
<p class="text-sm font-semibold">gabriela</p>
</div>
<button class="text-blue-500 text-xs font-bold">Seguir</button>
</div>

</div>
</aside>
</main>

<!-- Menu mobile -->
<nav class="fixed bottom-0 w-full bg-white border-t p-4 flex justify-around md:hidden text-xl">
<span>🏠</span>
<span>🔍</span>
<span>➕</span>
<span>🎬</span>
<span>👤</span>
</nav>

</body>
</html>
