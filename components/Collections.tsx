import { getCollections } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();
  //   console.log(collections);

  return (
    <div className="max-w-7xl mx-auto text-center space-y-16">
      <h2 className="text-3xl font-semibold tracking-tight">Collections</h2>
      <div className="flex gap-10 justify-center">
        {collections.map((collection: CollectionType) => (
          <Link href={`/collections/${collection._id}`} key={collection._id}>
            <div className="relative group">
              {/* Image with hover effect */}
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-pointer transition-all duration-300 group-hover:brightness-50"
              />

              {/* Title (Hidden by default, shown on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold  px-4 py-2 rounded-lg">
                  {collection.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
