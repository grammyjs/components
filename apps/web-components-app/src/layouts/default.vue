<template>
    <transition name="slide-up" appear>
        <router-view />
    </transition>
</template>

<style>
.slide-up-enter-active {
    transition: all 0.3s ease;
}

.slide-up-leave-active {
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-up-enter,
.slide-fade-leave-to {
    transform: translateY(5vh);
    opacity: 0;
}
</style>