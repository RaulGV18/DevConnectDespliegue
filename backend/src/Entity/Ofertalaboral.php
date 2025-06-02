<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OfertalaboralRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OfertalaboralRepository::class)]
#[ApiResource]
class Ofertalaboral
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ofertaslaborales')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Empresa $empresa = null;

    #[ORM\Column(length: 255)]
    private ?string $titulo = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descripcion = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $tecnologias_requeridas = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $experiencia_minima = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ubicacion = null;

    /**
     * @var Collection<int, Postulacion>
     */
    #[ORM\OneToMany(targetEntity: Postulacion::class, mappedBy: 'ofertalaboral', orphanRemoval: true)]
    private Collection $postulaciones;

    public function __construct()
    {
        $this->postulaciones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmpresa(): ?Empresa
    {
        return $this->empresa;
    }

    public function setEmpresa(?Empresa $empresa): static
    {
        $this->empresa = $empresa;

        return $this;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): static
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getTecnologiasRequeridas(): ?string
    {
        return $this->tecnologias_requeridas;
    }

    public function setTecnologiasRequeridas(?string $tecnologias_requeridas): static
    {
        $this->tecnologias_requeridas = $tecnologias_requeridas;

        return $this;
    }

    public function getExperienciaMinima(): ?string
    {
        return $this->experiencia_minima;
    }

    public function setExperienciaMinima(?string $experiencia_minima): static
    {
        $this->experiencia_minima = $experiencia_minima;

        return $this;
    }

    public function getUbicacion(): ?string
    {
        return $this->ubicacion;
    }

    public function setUbicacion(?string $ubicacion): static
    {
        $this->ubicacion = $ubicacion;

        return $this;
    }

    /**
     * @return Collection<int, Postulacion>
     */
    public function getPostulaciones(): Collection
    {
        return $this->postulaciones;
    }

    public function addPostulacione(Postulacion $postulacione): static
    {
        if (!$this->postulaciones->contains($postulacione)) {
            $this->postulaciones->add($postulacione);
            $postulacione->setOfertalaboral($this);
        }

        return $this;
    }

    public function removePostulacione(Postulacion $postulacione): static
    {
        if ($this->postulaciones->removeElement($postulacione)) {
            // set the owning side to null (unless already changed)
            if ($postulacione->getOfertalaboral() === $this) {
                $postulacione->setOfertalaboral(null);
            }
        }

        return $this;
    }
}
