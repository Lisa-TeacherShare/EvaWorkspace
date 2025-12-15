try {
    require('react');
    console.log('React found');
} catch (e) {
    console.error('React NOT found');
}

try {
    require('vite');
    console.log('Vite found');
} catch (e) {
    console.error('Vite NOT found');
}
