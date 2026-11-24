import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Polished-gold torus knot inside a wireframe shell, drifting gold dust, mouse parallax.
const HeroScene = () => {
    const mount = useRef(null);

    useEffect(() => {
        const el = mount.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        el.appendChild(renderer.domElement);
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;

        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, 0, 9);

        const group = new THREE.Group();
        scene.add(group);

        const goldMat = new THREE.MeshStandardMaterial({
            color: 0xe8c468, metalness: 1, roughness: 0.22, envMapIntensity: 1.4,
        });
        const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.25, 0.38, 320, 48, 2, 3), goldMat);
        group.add(knot);

        const shell = new THREE.LineSegments(
            new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.55, 2)),
            new THREE.LineBasicMaterial({ color: 0xe8c468, transparent: true, opacity: 0.16 })
        );
        group.add(shell);

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(3.3, 0.012, 8, 220),
            new THREE.MeshBasicMaterial({ color: 0xf6dd94, transparent: true, opacity: 0.55 })
        );
        ring.rotation.x = Math.PI / 2.6;
        group.add(ring);

        // gold dust
        const N = 700;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const r = 3 + Math.random() * 7;
            const th = Math.random() * Math.PI * 2;
            const ph = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
            pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
            pos[i * 3 + 2] = r * Math.cos(ph) - 2;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const dust = new THREE.Points(
            dustGeo,
            new THREE.PointsMaterial({ color: 0xf6dd94, size: 0.028, transparent: true, opacity: 0.75, depthWrite: false })
        );
        scene.add(dust);

        const key = new THREE.PointLight(0xfff0c8, 40, 30);
        key.position.set(4, 4, 6);
        scene.add(key);

        const resize = () => {
            const w = el.clientWidth || 1, h = el.clientHeight || 1;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            // desktop: sit the object on the right; mobile: centred above the copy
            const wide = w / h > 1.1;
            group.position.set(wide ? 2.6 : 0, wide ? 0 : 1.6, 0);
            group.scale.setScalar(wide ? 1 : 0.75);
            camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        const mouse = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
        const onMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMove);

        let raf, visible = true;
        const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
        io.observe(el);
        const clock = new THREE.Clock();

        const frame = () => {
            raf = requestAnimationFrame(frame);
            if (!visible) return;
            const t = clock.getElapsedTime();
            eased.x += (mouse.x - eased.x) * 0.05;
            eased.y += (mouse.y - eased.y) * 0.05;
            if (!reduce) {
                knot.rotation.x = t * 0.22 + eased.y * 0.4;
                knot.rotation.y = t * 0.3 + eased.x * 0.6;
                shell.rotation.y = -t * 0.08;
                shell.rotation.x = t * 0.05;
                ring.rotation.z = t * 0.12;
                dust.rotation.y = t * 0.02;
            }
            camera.position.x += (eased.x * 0.6 - camera.position.x) * 0.04;
            camera.position.y += (-eased.y * 0.4 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };
        frame();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            window.removeEventListener("mousemove", onMove);
            [knot.geometry, shell.geometry, ring.geometry, dustGeo].forEach((g) => g.dispose());
            [goldMat, shell.material, ring.material, dust.material].forEach((m) => m.dispose());
            envTex.dispose();
            pmrem.dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
};

export default HeroScene;
