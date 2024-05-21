const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || "http://localhost:8000/";

async function handleResponse(response) {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        throw new Error(JSON.stringify(data.message));
    }

    return data;
}

export async function apiRegister(credentials) {
    const response = await fetch(`${SERVER_ENDPOINT}api/user/register`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : credentials
    });

     return handleResponse(response).then((data) => {return data;});
}

export async function apiLogin(credentials) {
    const response = await fetch(`${SERVER_ENDPOINT}api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: credentials
    });

    return handleResponse(response).then((data) => { return data; });
}

export async function apiGetSession(token) {
    const response = await fetch(`${SERVER_ENDPOINT}api/user/session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : token
        }
    });
    return handleResponse(response).then((data) => { return data; });
}

export async function apiDeleteSession(token) {
    const response = await fetch(`${SERVER_ENDPOINT}api/user/session`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
    return handleResponse(response).then((data) => { return data; });
}

export async function apiCreateProduct(data, token) {
    const response = await fetch(`${SERVER_ENDPOINT}api/product`, {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: data
    });

    return handleResponse(response).then((data) => {return data})
}

export async function apiGetAllProduct() {
    const response = await fetch(`${SERVER_ENDPOINT}api/products`, {
        method: "GET",
    });

    return handleResponse(response).then((data) => { return data; })
}

export const apiGetCategory = async (key) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/categories?key=${key}`, {
        method: "GET",
        headers: {
            "Accept" : "application/json" 
        }
    })
    return handleResponse(response).then((data) => { return data; });
}

export const apiGetSellerProducts = async (key, page) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/seller/products?page=${page}`, {
        method: "GET", 
        headers: {
            "Authorization": key,
            "Accept" : "application/json"
        }
    })

    return handleResponse(response).then(data => { return data; })
}

export const apiGetProductBySlug = async (store, slug) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/product/${store}/${slug}`, {
        method: "GET", 
        headers: {
            "Accept" : "application/json"
        }
    })

    return handleResponse(response).then((data) => { return data });
}

export const apiGetStoreProducts = async (store_name, sort = 0) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/store/${store_name}/products?sort=${sort}`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiGetStoreProfile = async (store_name) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/store/${store_name}`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiGetProductDisscussion = async (slug) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/discussions/product/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiGetProductDiscussionReplies = async (slug) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/discussions/replies/product/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiPostProductDiscussionReplies = async (form, token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/discussion/replies/product`, {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: form
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiPostProductDiscussion = async (form, token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/discussions/product`, {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: form
    });
    return handleResponse(response).then((data) => {return data})
}

export const apiPostCart = async (form, token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/cart`, {
        method: "POST",
        headers: {
            "Authorization" : token
        },
        body : form
    })
    return handleResponse(response).then((data) => {return data})
}

export const apiGetCarts = async (token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/carts`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    return handleResponse(response).then((data) => {return data})
}

export const apiGetSearchProducts = async (key, pmin, pmax) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/products/search?key=${key}&pmin=${pmin}&pmax=${pmax}`, {
        method: "GET",
        headers: {
            "Accept" : "application/json"
        }
    });
    return handleResponse(response).then((data) => {return data})
}

export const apiPostDirectBuy = async (form, token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/order/direct`, {
        method: "POST",
        body : form,
        headers: {
            "Accept": "application/json",
            "Authorization" : token
        }
    });
    return handleResponse(response).then((data) => { return data });
}

export const apiGetDirectBuy = async (token) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/order/direct`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "token" : token
        }
    });
    return handleResponse(response).then((data) => { return data });
}