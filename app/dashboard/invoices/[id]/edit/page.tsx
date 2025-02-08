import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { CustomerField } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit an Invoice',
};


export default async function Page(props: { params: Promise<{ id: string }> }) {
    // Await the `params` before destructuring
    const params = await props.params;
    const id = params.id;

    // Fetch data in parallel
    const [customersData] = await Promise.all([
        //fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    // Transform customersData to match `CustomerField` type
    const customers: CustomerField[] = customersData.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
    }));


    const invoice: any = await fetchInvoiceById(id);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}