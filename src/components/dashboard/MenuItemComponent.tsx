import { menuNavigationHistoryAtom } from "@/app/dashboard/[restaurantId]/menu/page";
import { MenuItem } from "@/lib/firestore/types";
import useMenu from "@/lib/hooks/useMenu";
import { CaretRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function MenuItemComponent({
  item,
  restaurantId,
  setMenuItems,
}: {
  item: MenuItem;
  restaurantId: string;
  setMenuItems?: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}) {
  const [navigationHistory, setNavigationHistory] = useAtom(
    menuNavigationHistoryAtom
  );
  const { deleteMenuItem } = useMenu(restaurantId);

  return (
    <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
      {item.image ? (
        <figure className="rounded-box h-40 w-full object-cover">
          <img
            className="w-full h-full object-cover"
            src={item.image}
            alt={item.name}
          />
        </figure>
      ) : (
        <div className="h-40 bg-black/20 rounded-box"></div>
      )}
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>

        <div className="text-neutral-content">
          <p className="flex justify-between items-center">
            {item.description}
            {item.price}
          </p>
        </div>

        <div className="card-actions justify-end">
          <button
            onClick={() => {
              deleteMenuItem(item.id as string);
              setMenuItems &&
                setMenuItems((prev) =>
                  prev.filter((menuItem) => menuItem.id !== item.id)
                );
            }}
            className="btn btn-sm btn-error"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setNavigationHistory((history) => [
                ...history,
                {
                  ...item,
                },
              ]);
            }}
            className="btn btn-sm btn-primary"
          >
            <CaretRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
