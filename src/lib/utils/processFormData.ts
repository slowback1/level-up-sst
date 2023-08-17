export interface FormDataPair {
    name: string;
    value: any;
}

export default function processFormData<T>(data: FormData): T {
    let result: Partial<T> = {};

    let entries = [...data.entries()];

    entries.forEach((pair) => {
        result[pair[0]] = pair[1];
    })

    return result as T;
}