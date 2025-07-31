"use client";
import React, { useEffect, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";

// Normalize variation data
const formatVariations = (variations) =>
  variations.map((v) => ({
    ...v,
    variation_attributes: v.attributes || {},
  }));

const SelectVariant = () => {
  const {
    selectedProduct,
    selectedAttributes,
    selectedVariant,
    setSelectedVariant,
    setSelectedAttributes,
    resetSelections,
  } = useProductStore();

  useEffect(() => {
    if (selectedProduct?.id) resetSelections();
  }, [selectedProduct?.id]);

  const variations = useMemo(() => {
    return formatVariations(selectedProduct?.variations || []);
  }, [selectedProduct]);

  const attributeNames = useMemo(() => {
    return [
      ...new Set(
        variations.flatMap((v) => Object.keys(v.variation_attributes || {}))
      ),
    ];
  }, [variations]);

  // Find only values compatible with current partial selections
  const getAvailableValues = (attrName) => {
    return [
      ...new Set(
        variations
          .filter((v) =>
            attributeNames.every((key) => {
              if (key === attrName) return true;
              return (
                !selectedAttributes[key] ||
                v.variation_attributes?.[key] === selectedAttributes[key]
              );
            })
          )
          .map((v) => v.variation_attributes?.[attrName])
          .filter(Boolean)
      ),
    ];
  };

  const handleToggle = (attrName, value) => {
    const isSelected = selectedAttributes?.[attrName] === value;
    const updated = { ...selectedAttributes };

    if (isSelected) {
      delete updated[attrName];
    } else {
      updated[attrName] = value;
    }

    setSelectedAttributes(updated);

    const matchedVariant = variations.find((v) =>
      attributeNames.every(
        (key) => v.variation_attributes?.[key] === updated[key]
      )
    );

    setSelectedVariant(matchedVariant || null);
  };

  return (
    <div className="selectVariant">
      {attributeNames.map((attrName) => {
        const values = getAvailableValues(attrName);

        return (
          <div key={attrName} className="selectvariantContainer">
            <p className="selectVariantType">
              Select {attrName}:
              <span className="selectVariantTypeValue">
                {selectedAttributes?.[attrName] || "None"}
              </span>
            </p>

            <div className="selectVariantTypeOptions">
              {values.map((val) => {
                const isChecked = selectedAttributes?.[attrName] === val;
                return (
                  <label
                    key={val}
                    className={`selectVariantTypeOption ${
                      isChecked ? "checked" : "unchecked"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(attrName, val)}
                      className="selectVariantTypeOptionCheckbox"
                    />
                    <span className="selectVariantTypeOptionValue">{val}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectVariant;
