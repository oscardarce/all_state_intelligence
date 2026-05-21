"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AddPropertyModal } from "@/components/AddPropertyModal";
import { EditPropertyModal } from "@/components/EditPropertyModal";
import { Navbar } from "@/components/Navbar";
import { PropertyAnalysisPanel } from "@/components/PropertyAnalysisPanel";
import { PropertyList } from "@/components/PropertyList";
import { PropertyMap } from "@/components/PropertyMap";
import { WorkspaceTabs } from "@/components/WorkspaceTabs";
import { getComparables, getUniqueOptions, initialProperties } from "@/lib/properties";

const emptyFilters = { province: "", canton: "", district: "" };

export function DashboardWorkspace() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedId, setSelectedId] = useState(initialProperties[0].id);
  const [filters, setFilters] = useState(emptyFilters);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const selectedProperty = useMemo(
    () => properties.find((property) => property.id === selectedId) || properties[0],
    [properties, selectedId]
  );

  const options = useMemo(() => {
    const provinceMatches = properties.filter(
      (property) => !filters.province || property.province === filters.province
    );
    const cantonMatches = provinceMatches.filter(
      (property) => !filters.canton || property.canton === filters.canton
    );

    return {
      provinces: getUniqueOptions(properties, "province"),
      cantons: getUniqueOptions(provinceMatches, "canton"),
      districts: getUniqueOptions(cantonMatches, "district"),
    };
  }, [filters, properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.province && property.province !== filters.province) return false;
      if (filters.canton && property.canton !== filters.canton) return false;
      if (filters.district && property.district !== filters.district) return false;
      return true;
    });
  }, [filters, properties]);

  const visiblePropertyIds = useMemo(
    () => filteredProperties.map((property) => property.id),
    [filteredProperties]
  );

  const comparables = useMemo(
    () => getComparables(selectedProperty, properties),
    [properties, selectedProperty]
  );

  useEffect(() => {
    if (
      filteredProperties.length > 0 &&
      !filteredProperties.some((property) => property.id === selectedId)
    ) {
      setSelectedId(filteredProperties[0].id);
    }
  }, [filteredProperties, selectedId]);

  const selectProperty = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const addProperty = (property) => {
    setProperties((current) => [...current, property]);
    setSelectedId(property.id);
    setFilters({
      province: property.province,
      canton: property.canton,
      district: property.district,
    });
    setShowAddModal(false);
  };

  const updateProperty = (updatedProperty) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
    setSelectedId(updatedProperty.id);
    setFilters((current) => {
      const hasFilters = current.province || current.canton || current.district;
      if (!hasFilters) return current;
      return {
        province: updatedProperty.province,
        canton: updatedProperty.canton,
        district: updatedProperty.district,
      };
    });
    setShowEditModal(false);
  };

  const addNote = (note) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === selectedProperty.id
          ? { ...property, notes: [...(property.notes || []), note] }
          : property
      )
    );
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-paper text-ink">
      <Navbar
        filters={filters}
        options={options}
        propertyCount={filteredProperties.length}
        onFilterChange={setFilters}
        onClearFilters={() => setFilters(emptyFilters)}
        onAddProperty={() => setShowAddModal(true)}
      />

      <div className="grid min-h-0 flex-1 grid-cols-[clamp(232px,14vw,260px)_minmax(0,1fr)_clamp(360px,22vw,400px)] overflow-hidden">
        <PropertyList
          properties={filteredProperties}
          selectedId={selectedProperty.id}
          onSelectProperty={selectProperty}
        />

        <div className="grid min-w-0 grid-rows-[minmax(0,1fr)_286px] overflow-hidden">
          <PropertyMap
            properties={properties}
            selectedProperty={selectedProperty}
            visiblePropertyIds={visiblePropertyIds}
            comparables={comparables}
            onSelectProperty={selectProperty}
          />
          <WorkspaceTabs
            property={selectedProperty}
            comparables={comparables}
            onAddNote={addNote}
          />
        </div>

        <PropertyAnalysisPanel
          property={selectedProperty}
          comparables={comparables}
          onEdit={() => setShowEditModal(true)}
        />
      </div>

      {showAddModal ? (
        <AddPropertyModal onSave={addProperty} onCancel={() => setShowAddModal(false)} />
      ) : null}

      {showEditModal ? (
        <EditPropertyModal
          property={selectedProperty}
          onSave={updateProperty}
          onCancel={() => setShowEditModal(false)}
        />
      ) : null}
    </main>
  );
}
