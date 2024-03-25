import prisma from "@/app/lib/db";
import { DocumentsDataTable } from "@/components/table/documents/documents-data-table";
import { documentsColumns } from "@/components/table/documents/documents-table-columns";

const DocumentsPage = async () => {
  const documents = await prisma.schedule.findMany({
    orderBy: { updatedAt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Documents table</h2>
      <DocumentsDataTable columns={documentsColumns} data={documents} />
    </div>
  );
};

export default DocumentsPage;
