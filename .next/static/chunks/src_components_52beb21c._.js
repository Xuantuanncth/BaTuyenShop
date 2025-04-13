(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/ProductModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/ProductModal.tsx
__turbopack_context__.s({
    "default": (()=>ProductModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
;
function ProductModal({ product, onClose }) {
    if (!product) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            onClick: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "bg-white rounded-lg p-6 w-full max-w-md",
                initial: {
                    scale: 0.8
                },
                animate: {
                    scale: 1
                },
                exit: {
                    scale: 0.8
                },
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.image,
                        alt: product.name,
                        className: "w-full h-60 object-cover rounded"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mt-4",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-gray-600",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    product.quantity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2",
                        children: [
                            "Số lượng: ",
                            product.quantity
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 42,
                        columnNumber: 32
                    }, this),
                    product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2",
                        children: [
                            "Giá: ",
                            product.price,
                            "₫"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 43,
                        columnNumber: 29
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
                        children: "Đóng"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductModal.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductModal.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProductModal.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ProductModal.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = ProductModal;
var _c;
__turbopack_context__.k.register(_c, "ProductModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ProductSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const dummyProducts = [
    {
        id: 1,
        name: 'Áo Thun Nông Dân',
        description: 'Thoáng mát, thích hợp làm việc ngoài trời.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 2,
        name: 'Quần Bò Đi Rẫy',
        description: 'Bền bỉ, chịu được môi trường khắc nghiệt.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 3,
        name: 'Mũ Tai Bèo',
        description: 'Che nắng, bảo vệ da khỏi tia UV.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 4,
        name: 'Găng Tay Lao Động',
        description: 'Giúp tay không bị trầy xước khi làm việc.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 5,
        name: 'Khăn Rằn',
        description: 'Đa năng, thấm hút mồ hôi tốt.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 6,
        name: 'Áo Bà Ba',
        description: 'Truyền thống, thoải mái khi mặc.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 7,
        name: 'Nón Lá',
        description: 'Che mưa, che nắng hiệu quả.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 8,
        name: 'Ủng Cao Su',
        description: 'Chống nước, bảo vệ chân trong môi trường ẩm ướt.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 9,
        name: 'Áo Khoác Chống Nắng',
        description: 'Giúp bảo vệ da khỏi tác hại của ánh nắng mặt trời.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 10,
        name: 'Bộ Quần Áo Bảo Hộ',
        description: 'An toàn, thoải mái vận động khi làm việc nặng.',
        image: 'https://via.placeholder.com/400x300',
        category: 'quan-ao',
        quantity: 100,
        price: 150000
    },
    {
        id: 11,
        name: 'Thức Ăn Gà Con',
        description: 'Cung cấp đầy đủ dinh dưỡng cho giai đoạn phát triển của gà con.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 12,
        name: 'Thức Ăn Vịt Xiêm',
        description: 'Giúp vịt xiêm tăng trưởng nhanh và khỏe mạnh.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 13,
        name: 'Cám Heo',
        description: 'Nguồn năng lượng chính và dinh dưỡng cần thiết cho heo.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 14,
        name: 'Lúa',
        description: 'Thực phẩm cơ bản cho nhiều loại gia súc và gia cầm.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 15,
        name: 'Bắp',
        description: 'Nguồn dinh dưỡng quan trọng, giàu carbohydrate.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 16,
        name: 'Rau Muống',
        description: 'Nguồn thức ăn xanh tươi ngon cho một số loại gia cầm.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 17,
        name: 'Cỏ Voi',
        description: 'Nguồn thức ăn thô xanh quan trọng cho gia súc nhai lại.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 18,
        name: 'Bã Đậu Nành',
        description: 'Giàu protein, tốt cho sự phát triển của vật nuôi.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 19,
        name: 'Thức Ăn Viên Cho Cá',
        description: 'Cân bằng dinh dưỡng, giúp cá phát triển khỏe mạnh.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 20,
        name: 'Muối Khoáng Cho Gia Súc',
        description: 'Bổ sung các khoáng chất cần thiết cho sự phát triển của gia súc.',
        image: 'https://via.placeholder.com/400x300',
        category: 'thuc-an',
        quantity: 100,
        price: 150000
    },
    {
        id: 21,
        name: 'Phân Lân',
        description: 'Kích thích ra rễ, giúp cây con phát triển khỏe mạnh.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 22,
        name: 'Phân Đạm',
        description: 'Tăng cường sự phát triển của chồi và lá.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 23,
        name: 'Phân Kali',
        description: 'Giúp cây ra hoa đậu quả, tăng sức đề kháng.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 24,
        name: 'Phân Trùn Quế',
        description: 'Phân hữu cơ tự nhiên, cải tạo đất, tốt cho cây trồng.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 25,
        name: 'Phân Gà',
        description: 'Nguồn phân hữu cơ giàu dinh dưỡng, giúp cây phát triển bền vững.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 26,
        name: 'Vôi Bột',
        description: 'Khử chua đất, cung cấp canxi cho cây.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 27,
        name: 'NPK 16-16-8',
        description: 'Phân bón hóa học hỗn hợp, cung cấp đầy đủ đạm, lân, kali.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 28,
        name: 'DAP',
        description: 'Phân bón hóa học giàu lân và đạm, kích thích ra rễ và chồi.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 29,
        name: 'Phân Vi Sinh',
        description: 'Tăng cường hệ vi sinh vật có lợi trong đất, giúp cây hấp thụ dinh dưỡng tốt hơn.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    },
    {
        id: 30,
        name: 'Humic Acid',
        description: 'Cải thiện cấu trúc đất, tăng khả năng giữ nước và dinh dưỡng.',
        image: 'https://via.placeholder.com/400x300',
        category: 'phan-bon',
        quantity: 100,
        price: 150000
    }
];
function ProductSection({ title, category }) {
    _s();
    const [start, setStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [filtered, setFiltered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductSection.useEffect": ()=>{
            const items = dummyProducts.filter({
                "ProductSection.useEffect.items": (p)=>p.category === category
            }["ProductSection.useEffect.items"]);
            setFiltered(items);
            setStart(0);
        }
    }["ProductSection.useEffect"], [
        category
    ]);
    const visible = filtered.slice(start, start + 3);
    const canPrev = start > 0;
    const canNext = start + 3 < filtered.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: category,
        className: "py-16 px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-4xl font-bold mb-10 text-center text-blue-700",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ProductSection.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-10 flex-wrap min-h-[400px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: visible.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -30
                            },
                            transition: {
                                duration: 0.3
                            },
                            className: "bg-white rounded-2xl shadow-xl p-6 w-96 transition-transform transform hover:scale-105",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: p.image,
                                    alt: p.name,
                                    className: "w-full h-60 object-cover rounded-xl"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductSection.tsx",
                                    lineNumber: 319,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-semibold mt-4",
                                    children: p.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductSection.tsx",
                                    lineNumber: 320,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-base mt-2",
                                    children: p.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductSection.tsx",
                                    lineNumber: 321,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-700 text-lg font-bold mt-2",
                                    children: [
                                        "Giá: ",
                                        p.price
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ProductSection.tsx",
                                    lineNumber: 322,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedProduct(p),
                                    className: "mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
                                    children: "Xem chi tiết"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductSection.tsx",
                                    lineNumber: 323,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/src/components/ProductSection.tsx",
                            lineNumber: 311,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductSection.tsx",
                    lineNumber: 309,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductSection.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-6 mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canPrev ? 'opacity-50 cursor-not-allowed' : ''}`,
                        onClick: ()=>canPrev && setStart(start - 3),
                        disabled: !canPrev,
                        children: "◀"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductSection.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `px-5 py-3 rounded-full text-lg bg-gray-300 hover:bg-gray-400 ${!canNext ? 'opacity-50 cursor-not-allowed' : ''}`,
                        onClick: ()=>canNext && setStart(start + 3),
                        disabled: !canNext,
                        children: "▶"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductSection.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductSection.tsx",
                lineNumber: 334,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                product: selectedProduct,
                onClose: ()=>setSelectedProduct(null)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductSection.tsx",
                lineNumber: 350,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductSection.tsx",
        lineNumber: 305,
        columnNumber: 7
    }, this);
}
_s(ProductSection, "ms7N4lXcARs9DQXD4jKh6zUiga8=");
_c = ProductSection;
var _c;
__turbopack_context__.k.register(_c, "ProductSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_52beb21c._.js.map