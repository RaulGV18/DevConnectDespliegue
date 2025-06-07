<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PostulacionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: PostulacionRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: [
    'ofertalaboral' => 'exact',
])]
class Postulacion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $usuario = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Ofertalaboral $ofertalaboral = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): static
    {
        $this->usuario = $usuario;

        return $this;
    }

    public function getOfertalaboral(): ?Ofertalaboral
    {
        return $this->ofertalaboral;
    }

    public function setOfertalaboral(?Ofertalaboral $ofertalaboral): static
    {
        $this->ofertalaboral = $ofertalaboral;

        return $this;
    }
}
