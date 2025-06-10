<?php
// src/Controller/CvDeleteController.php
namespace App\Controller;

use App\Entity\Postulacion;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CvDeleteController extends AbstractController
{
    #[Route('/postulacion/delete-pdf/{postulacionId}', name: 'postulacion_delete_pdf', methods: ['DELETE'])]
    public function deletePdf(int $postulacionId, EntityManagerInterface $em): JsonResponse
    {
        $postulacion = $em->getRepository(Postulacion::class)->find($postulacionId);

        if (!$postulacion) {
            return new JsonResponse(['error' => 'Postulación no encontrada.'], Response::HTTP_NOT_FOUND);
        }

        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/pdfs';
        $filename = sprintf(
            'oferta%d_usuario%d.pdf',
            $postulacion->getOfertalaboral()->getId(),
            $postulacion->getUsuario()->getId()
        );

        $filePath = $uploadDir . '/' . $filename;

        if (file_exists($filePath)) {
            unlink($filePath);
            return new JsonResponse(['message' => 'CV eliminado correctamente.'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['error' => 'Archivo no encontrado.'], Response::HTTP_NOT_FOUND);
        }
    }
}
